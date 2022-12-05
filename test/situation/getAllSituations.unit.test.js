// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./getAllSituations.data.mock.json");
const Situation = require("../../situation/models/Situation");
const getAllSituationsService = require("../../situation/services/getAllSituations.service");
const { stubFindAllSituations } = require("../helpers/helper.sinon");

// get all situation unit test
describe("GET ALL SITUATIONS UNIT TEST", () => {
  const foundData = { ...situationData.foundData.valid };

  afterEach(() => {
    Situation.find.restore();
  });

  it("should get all situations successfully", async () => {
    const stubFind = stubFindAllSituations(foundData);

    const response = await getAllSituationsService();

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
