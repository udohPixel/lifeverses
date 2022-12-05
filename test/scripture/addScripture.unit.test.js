// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./addScripture.data.mock.json");
const Scripture = require("../../scripture/models/Scripture");
const addScriptureService = require("../../scripture/services/addScripture.service");
const { stubFindOneScripture } = require("../helpers/helper.sinon");

// create scripture test
describe("CREATE SCRIPTURE UNIT TEST", () => {
  const inputData = { ...scriptureData.bodyData.valid };
  const userData = { ...scriptureData.userData.valid };
  const paramsData = { ...scriptureData.paramsData.valid };
  const foundData = scriptureData.foundData.valid;

  const stubData = {
    "id": "638461fd5a145a04e704ca0b",
    "userId": "636b9a3d4f562bab327b163e",
    "slug": "matthew1-1-7",
    "situationId": "636b9d4e4f562bab327b1643",
    "bibleVersion": "NKJV",
    "bibleTitle": inputData.bibleTitle,
    "bibleChapter": inputData.bibleChapter,
    "bibleVerses": inputData.bibleVerses.split(","),
    "createdAt": "2022-11-28T07:23:41.246Z",
    "updatedAt": "2022-11-28T07:23:41.246Z"
  }

  afterEach(() => {
    Scripture.findOne.restore();
    Scripture.create.restore();
  })

  it("should create a scripture successfully", async () => {
    const stubFind = stubFindOneScripture(foundData);
    const stubCreate = sinon.stub(Scripture, "create").resolves(stubData);

    const response = await addScriptureService(userData.id, paramsData.situation_id, inputData.bibleTitle, inputData.bibleChapter, inputData.bibleVerses);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
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
