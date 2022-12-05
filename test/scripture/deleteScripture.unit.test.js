// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./deleteScripture.data.mock.json");
const Situation = require("../../situation/models/Situation");
const Scripture = require("../../scripture/models/Scripture");
const deleteScriptureService = require("../../scripture/services/deleteScripture.service");
const { stubFindOneSituation, stubFindOneScripture } = require("../helpers/helper.sinon");

// delete scripture test
describe("DELETE SCRIPTURE UNIT TEST", () => {
  const userData = { ...scriptureData.userData.valid };
  const paramsData = { ...scriptureData.paramsData.valid };
  const foundData1 = { ...scriptureData.foundData.valid1 };
  const foundData = { ...scriptureData.foundData.valid };

  const stubData = {
    "id": foundData.id,
    "userId": foundData.userId,
    "slug": foundData.slug,
    "situationId": foundData.situationId,
    "bibleVersion": foundData.bibleVersion,
    "bibleTitle": foundData.bibleTitle,
    "bibleChapter": foundData.bibleChapter,
    "bibleVerses": foundData.bibleVerses,
    "createdAt": foundData.createdAt,
    "updatedAt": foundData.updatedAt
  }

  afterEach(() => {
    Situation.findOne.restore();
    Scripture.findOne.restore();
  });

  after(() => {
    Scripture.findOneAndRemove.restore();
  });

  it("should delete a scripture successfully", async () => {
    const stubFindSituation = stubFindOneSituation(foundData1);
    const stubFind = stubFindOneScripture(foundData);
    const stubDelete = sinon.stub(Scripture, "findOneAndRemove").resolves(stubData);

    const response = await deleteScriptureService(userData.role, userData.id, paramsData.situation_id, paramsData.scripture_id);

    expect(stubFindSituation.calledOnce).to.be.true;
    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(stubDeleteCallArg._id).to.equal(paramsData.scripture_id);
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", stubData.id);
    expect(response).to.have.property("userId", stubData.userId);
    expect(response).to.have.property("slug", stubData.slug);
    expect(response).to.have.property("situationId", stubData.situationId);
    expect(response).to.have.property("bibleVersion", stubData.bibleVersion);
    expect(response).to.have.property("bibleTitle", stubData.bibleTitle);
    expect(response).to.have.property("bibleChapter", stubData.bibleChapter);
    expect(response).to.have.property("bibleVerses", stubData.bibleVerses);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });

});
