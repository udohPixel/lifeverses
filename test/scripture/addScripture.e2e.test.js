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
const addScriptureCtrl = require("../../scripture/controllers/addScripture.controller");
const { stubFindOneScripture } = require("../helpers/helper.sinon");

// create scripture test
describe("CREATE SCRIPTURE E2E TEST", () => {
  describe("POSITIVE TEST", () => {
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

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Scripture.findOne.restore();
      Scripture.create.restore();
    });

    it("should create a scripture successfully", async () => {
      const req = {
        body: inputData,
        params: paramsData,
        user: userData
      };

      const stubFind = stubFindOneScripture(foundData);
      const stubCreate = sinon.stub(Scripture, "create").resolves(stubData);

      await addScriptureCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Scripture added successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });

  });

  describe("NEGATIVE TEST", () => {
    const inputData = { ...scriptureData.bodyData.valid };
    const userData = { ...scriptureData.userData.valid };
    const paramsData = { ...scriptureData.paramsData.invalid };
    const foundData = { ...scriptureData.foundData.invalid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Scripture.findOne.restore();
    });

    it("should not create a scripture successfully when scripture already exist", async () => {
      const req = {
        body: inputData,
        user: userData,
        params: paramsData
      };

      const stubFind = stubFindOneScripture(foundData);

      await addScriptureCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Scripture already exists for this situation. Try another");
    });
  });

});
