// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./updateSituation.data.mock.json");
const Situation = require("../../situation/models/Situation");
const updateSituationService = require("../../situation/services/updateSituation.service");
const { titleToSlug } = require("../../common/helpers");

// update situation test
describe("UPDATE SITUATION UNIT TEST", () => {
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
    "id": inputData.situationId,
    "title": inputData.title,
    "slug": titleToSlug(inputData.title),
    "colour": inputData.colour,
    "icon": inputData.icon,
    "createdAt": "2022-11-09T12:30:06.312Z",
    "updatedAt": "2022-11-09T12:30:06.312Z",
  }

  afterEach(() => {
    Situation.findOne.restore();
    Situation.findOneAndUpdate.restore();
  });

  it("should update a situation successfully", async () => {
    const stubFind = sinon.stub(Situation, "findOne").returns(foundData);
    const stubUpdate = sinon.stub(Situation, "findOneAndUpdate").returns(stubData);

    const response = await updateSituationService(inputData.situationId, inputData.title, inputData.colour, inputData.icon);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
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
