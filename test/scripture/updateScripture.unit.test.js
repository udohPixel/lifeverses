// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./updateScripture.data.mock.json");
const Situation = require("../../situation/models/Situation");
const Scripture = require("../../scripture/models/Scripture");
const updateScriptureService = require("../../scripture/services/updateScripture.service");
const { stubFindOneSituation, stubFindOneScripture } = require("../helpers/helper.sinon");

// update scripture test
describe("UPDATE SCRIPTURE UNIT TEST", () => {
  const inputData = { ...scriptureData.bodyData.valid };
  const paramsData = { ...scriptureData.paramsData.valid };
  const userData = { ...scriptureData.userData.valid };
  const foundData1 = { ...scriptureData.foundData.valid1 };
  const foundData = { ...scriptureData.foundData.valid };

  const stubData = {
    "id": foundData.id,
    "userId": foundData.userId,
    "slug": foundData.slug,
    "situationId": foundData.situationId,
    "bibleVersion": foundData.bibleVersion,
    "bibleTitle": inputData.bibleTitle,
    "bibleChapter": inputData.bibleChapter,
    "bibleVerses": inputData.bibleVerses.split(","),
    "createdAt": foundData.createdAt,
    "updatedAt": "2022-11-28T07:23:41.246Z"
  };

  afterEach(() => {
    Situation.findOne.restore();
    Scripture.findOne.restore();
    Scripture.findOneAndUpdate.restore();
  });

  it("should update a scripture successfully", async () => {
    const stubFindSituation = stubFindOneSituation(foundData1);
    const stubFind = stubFindOneScripture(foundData);
    const stubUpdate = sinon.stub(Scripture, "findOneAndUpdate").resolves(stubData);

    const response = await updateScriptureService(userData.role, userData.id, paramsData.situation_id, paramsData.scripture_id, inputData.bibleTitle, inputData.bibleChapter, inputData.bibleVerses);

    expect(stubFindSituation.calledOnce).to.be.true;
    expect(stubFind.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    const stubUpdateCallArg = stubFind.getCalls()[0].args[0];
    expect(stubUpdateCallArg).to.be.an('object');
    expect(stubUpdateCallArg._id).to.equal(paramsData.scripture_id);
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
