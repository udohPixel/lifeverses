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
const { stubFindOneSituation } = require("../helpers/helper.sinon");

// delete situation test
describe("DELETE SITUATION UNIT TEST", () => {
  const paramsData = { ...situationData.paramsData.valid };
  const foundData = { ...situationData.foundData.valid };

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
    const stubFind = stubFindOneSituation(foundData);
    const stubDelete = sinon.stub(Situation, "findOneAndRemove").resolves(stubData);

    const response = await deleteSituationService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(stubDeleteCallArg._id).to.equal(paramsData.id);
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
