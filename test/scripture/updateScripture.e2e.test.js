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
const updateScriptureCtrl = require("../../scripture/controllers/updateScripture.controller");
const { stubFindOneSituation, stubFindOneScripture } = require("../helpers/helper.sinon");

// update scripture test
describe("UPDATE SCRIPTURE E2E TEST", () => {
  describe("POSITIVE TEST", () => {
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

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Situation.findOne.restore();
      Scripture.findOne.restore();
      Scripture.findOneAndUpdate.restore();
    });

    it("should update a scripture successfully", async () => {
      const req = {
        body: inputData,
        params: paramsData,
        user: userData
      };

      const stubFindSituation = stubFindOneSituation(foundData1);
      const stubFind = stubFindOneScripture(foundData);
      const stubUpdate = sinon.stub(Scripture, "findOneAndUpdate").resolves(stubData);

      await updateScriptureCtrl(req, res);

      expect(stubFindSituation.calledOnce).to.be.true;
      expect(stubFind.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Scripture updated successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe("NEGATIVE TEST", () => {
    const inputData = { ...scriptureData.bodyData.valid };
    const paramsData = { ...scriptureData.paramsData.invalid };
    const userData = { ...scriptureData.userData.valid };
    const foundData1 = { ...scriptureData.foundData.valid1 };
    const foundDataNone = scriptureData.foundData.invalid;

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Situation.findOne.restore();
    });

    after(() => {
      Scripture.findOne.restore();
    });

    it("should not update a scripture successfully when situation is not found by id", async () => {
      const req = {
        body: inputData,
        params: paramsData,
        user: userData
      };

      const stubFindSituation = stubFindOneSituation(foundDataNone);

      await updateScriptureCtrl(req, res);

      expect(stubFindSituation.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Situation does not exist");
    });

    it("should not update a scripture successfully when scripture is not found by id", async () => {
      const req = {
        body: inputData,
        params: paramsData,
        user: userData
      };

      const stubFindSituation = stubFindOneSituation(foundData1);
      const stubFind = stubFindOneScripture(foundDataNone);

      await updateScriptureCtrl(req, res);

      expect(stubFindSituation.calledOnce).to.be.true;
      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Scripture does not exist");
    });
  });

});
