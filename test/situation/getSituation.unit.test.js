// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./getSituation.data.mock.json");
const Situation = require("../../situation/models/Situation");
const getSituationService = require("../../situation/services/getSituation.service");

// get situation by id test
describe("GET SITUATION BY ID UNIT TEST", () => {
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

  afterEach(() => {
    Situation.findOne.restore();
  });

  it("should get situation by id successfully", async () => {
    const stubFind = sinon.stub(Situation, "findOne").returns(foundData);

    const response = await getSituationService(inputData.situationId);

    // console.log(response);
    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", foundData.id);
    expect(response).to.have.property("title", foundData.title);
    expect(response).to.have.property("slug", foundData.slug);
    expect(response).to.have.property("colour", foundData.colour);
    expect(response).to.have.property("icon", foundData.icon);
    expect(response).to.have.property("createdAt", foundData.createdAt);
    expect(response).to.have.property("updatedAt", foundData.updatedAt);
  });

});
