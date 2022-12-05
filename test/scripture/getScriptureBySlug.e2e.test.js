// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./getScriptureBySlug.data.mock.json");
const Situation = require("../../situation/models/Situation");
const Scripture = require("../../scripture/models/Scripture");
const getScriptureBySlugCtrl = require("../../scripture/controllers/getScriptureBySlug.controller");
const { stubFindOneSituation, stubFindOneScripture } = require("../helpers/helper.sinon");

// get scripture by slug test
describe("GET SCRIPTURE BY SLUG E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const paramsData = { ...scriptureData.paramsData.valid };
    const foundData1 = { ...scriptureData.foundData.valid1 };
    const foundData = { ...scriptureData.foundData.valid };

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

    it("should get scripture by slug successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFindSituation = stubFindOneSituation(foundData1);
      const stubFind = stubFindOneScripture(foundData);

      await getScriptureBySlugCtrl(req, res);

      expect(stubFindSituation.calledOnce).to.be.true;
      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Scripture found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

  describe("NEGATIVE TEST", () => {
    const paramsData = { ...scriptureData.paramsData.invalid };
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

    it("should not get situation by slug successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneSituation(foundDataNone);

      await getScriptureBySlugCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Situation does not exist");
    });

    it("should not get scripture by slug successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFindSituation = stubFindOneSituation(foundData1);
      const stubFind = stubFindOneScripture(foundDataNone);

      await getScriptureBySlugCtrl(req, res);

      expect(stubFindSituation.calledOnce).to.be.true;
      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Scripture does not exist for this situation");
    });
  });

});
