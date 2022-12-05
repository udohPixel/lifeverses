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
const deleteScriptureCtrl = require("../../scripture/controllers/deleteScripture.controller");
const { stubFindOneSituation, stubFindOneScripture } = require("../helpers/helper.sinon");

// delete scripture test
describe("DELETE SCRIPTURE E2E TEST", () => {
  describe("POSITIVE TEST", () => {
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
    });

    after(() => {
      Scripture.findOneAndRemove.restore();
    });

    it("should delete a scripture successfully", async () => {
      const req = {
        params: paramsData,
        user: userData
      };

      const stubFindSituation = stubFindOneSituation(foundData1);
      const stubFind = stubFindOneScripture(foundData);
      const stubDelete = sinon.stub(Scripture, "findOneAndRemove").resolves(stubData);

      await deleteScriptureCtrl(req, res);

      expect(stubFindSituation.calledOnce).to.be.true;
      expect(stubFind.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Scripture was deleted successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe("NEGATIVE TEST", () => {
    const userData = { ...scriptureData.userData.valid };
    const paramsData = { ...scriptureData.paramsData.valid };
    const foundData1 = scriptureData.foundData.valid1;
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

    it("should not delete a scripture successfully when situation is not found by id", async () => {
      const req = {
        params: paramsData,
        user: userData
      };

      const stubFind = stubFindOneSituation(foundDataNone);

      await deleteScriptureCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Situation does not exist");
    });

    it("should not delete a scripture successfully when scripture is not found by id", async () => {
      const req = {
        params: paramsData,
        user: userData
      };

      const stubFindSituation = stubFindOneSituation(foundData1);
      const stubFind = stubFindOneScripture(foundDataNone);

      await deleteScriptureCtrl(req, res);

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
