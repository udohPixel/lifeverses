// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./addSituation.data.mock.json");
const Situation = require("../../situation/models/Situation");
const addSituationService = require("../../situation/services/addSituation.service");
const { stubFindOneSituation } = require("../helpers/helper.sinon");

// create situation test
describe("CREATE SITUATION UNIT TEST", () => {
  const inputData = { ...situationData.bodyData.valid };
  inputData.title = Date.now() + "_" + inputData.title;
  const foundData = situationData.foundData.valid;

  const stubData = {
    "id": "636b9d4e4f562bab327b1643",
    "title": inputData.title,
    "slug": "thank-you-god",
    "colour": inputData.colour,
    "icon": inputData.icon,
    "createdAt": "2022-11-09T12:30:06.312Z",
    "updatedAt": "2022-11-09T12:30:06.312Z",
  }

  afterEach(() => {
    Situation.findOne.restore();
    Situation.create.restore();
  })

  it("should create a situation successfully", async () => {
    const stubFind = stubFindOneSituation(foundData);
    const stubCreate = sinon.stub(Situation, "create").resolves(stubData);

    const response = await addSituationService(inputData.title, inputData.colour, inputData.icon);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
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
