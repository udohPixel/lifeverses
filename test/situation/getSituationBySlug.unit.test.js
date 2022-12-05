// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./getSituation.data.mock.json");
const Situation = require("../../situation/models/Situation");
const getSituationService = require("../../situation/services/getSituation.service");
const { stubFindOneSituation } = require("../helpers/helper.sinon");

// get situation by slug test
describe("GET SITUATION BY SLUG UNIT TEST", () => {
  const paramsData = { ...situationData.paramsData.valid };
  const foundData = { ...situationData.foundData.valid };

  afterEach(() => {
    Situation.findOne.restore();
  });

  it("should get situation by slug successfully", async () => {
    const stubFind = stubFindOneSituation(foundData);

    const response = await getSituationService(paramsData.slug);

    expect(stubFind.calledOnce).to.be.true;
    const stubFindCallArg = stubFind.getCalls()[0].args[0];
    expect(stubFindCallArg).to.be.an('object');
    expect(stubFindCallArg.slug).to.equal(paramsData.slug);
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
