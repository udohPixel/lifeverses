// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./deleteSituation.data.mock.json");
const Situation = require("../../situation/models/Situation");
const deleteSituationService = require("../../situation/services/deleteSituation.service");

// delete situation test
describe("DELETE SITUATION UNIT TEST", () => {
  const inputData = { ...situationData.validData };

  const foundData = {
    "id": "636b9d4e4f562bab327b1643",
    "title": "Thank you God",
    "slug": "thank-you-god",
    "colour": "bg-green-1 color-green",
    "icon": "ri-love-and-thanks",
    "createdAt": "2022-11-09T12:30:06.312Z",
    "updatedAt": "2022-11-09T12:30:06.312Z",
  };

  const stubData = {
    "id": foundData.situationId,
    "title": foundData.title,
    "slug": foundData.slug,
    "colour": foundData.colour,
    "icon": foundData.icon,
    "createdAt": foundData.createdAt,
    "updatedAt": foundData.updatedAt,
  }

  afterEach(() => {
    Situation.findOne.restore();
    Situation.findOneAndRemove.restore();
  });

  it("should delete a situation successfully", async () => {
    const stubFind = sinon.stub(Situation, "findOne").returns(foundData);
    const stubDelete = sinon.stub(Situation, "findOneAndRemove").returns(stubData);

    const response = await deleteSituationService(inputData.situationId);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", stubData.id);
    expect(response).to.have.property("title", stubData.title);
    expect(response).to.have.property("slug", stubData.slug);
    expect(response).to.have.property("colour", stubData.colour);
    expect(response).to.have.property("icon", stubData.icon);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });

});
