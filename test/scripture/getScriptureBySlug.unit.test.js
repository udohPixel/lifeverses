// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./getScripture.data.mock.json");
const Situation = require("../../situation/models/Situation");
const Scripture = require("../../scripture/models/Scripture");
const getScriptureBySlugService = require("../../scripture/services/getScriptureBySlug.service");
const { stubFindOneSituation, stubFindOneScripture } = require("../helpers/helper.sinon");

// get scripture by slug test
describe("GET SCRIPTURE BY ID UNIT TEST", () => {
  const paramsData = { ...scriptureData.paramsData.valid };
  const foundData1 = { ...scriptureData.foundData.valid1 };
  const foundData = { ...scriptureData.foundData.valid };

  afterEach(() => {
    Situation.findOne.restore();
    Scripture.findOne.restore();
  });

  it("should get scripture by slug successfully", async () => {
    const stubFindSituation = stubFindOneSituation(foundData1);
    const stubFind = stubFindOneScripture(foundData);

    const response = await getScriptureBySlugService(paramsData.slug);

    expect(stubFindSituation.calledOnce).to.be.true;
    expect(stubFind.calledOnce).to.be.true;
    const stubFindSituationCallArg = stubFindSituation.getCalls()[0].args[0];
    expect(stubFindSituationCallArg).to.be.an('object');
    expect(stubFindSituationCallArg.slug).to.equal(paramsData.situation_slug);
    const stubFindCallArg = stubFind.getCalls()[0].args[0];
    expect(stubFindCallArg).to.be.an('object');
    expect(stubFindCallArg.slug).to.equal(paramsData.slug);
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", foundData.id);
    expect(response).to.have.property("userId", foundData.userId);
    expect(response).to.have.property("slug", foundData.slug);
    expect(response).to.have.property("situationId", foundData.situationId);
    expect(response).to.have.property("bibleVersion", foundData.bibleVersion);
    expect(response).to.have.property("bibleTitle", foundData.bibleTitle);
    expect(response).to.have.property("bibleChapter", foundData.bibleChapter);
    expect(response).to.have.property("bibleVerses", foundData.bibleVerses);
    expect(response).to.have.property("createdAt", foundData.createdAt);
    expect(response).to.have.property("updatedAt", foundData.updatedAt);
  });

});
