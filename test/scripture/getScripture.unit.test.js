// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./getScripture.data.mock.json");
const Scripture = require("../../scripture/models/Scripture");
const getScriptureService = require("../../scripture/services/getScripture.service");
const { stubFindOneScripture } = require("../helpers/helper.sinon");

// get scripture by id test
describe("GET SCRIPTURE BY ID UNIT TEST", () => {
  const paramsData = { ...scriptureData.paramsData.valid };
  const foundData = { ...scriptureData.foundData.valid };

  afterEach(() => {
    Scripture.findOne.restore();
  });

  it("should get scripture by id successfully", async () => {
    const stubFind = stubFindOneScripture(foundData);

    const response = await getScriptureService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    const stubFindCallArg = stubFind.getCalls()[0].args[0];
    expect(stubFindCallArg).to.be.an('object');
    expect(stubFindCallArg._id).to.equal(paramsData.id);
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
