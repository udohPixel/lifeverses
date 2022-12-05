// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./getScripture.data.mock.json");
const Scripture = require("../../scripture/models/Scripture");
const getScriptureCtrl = require("../../scripture/controllers/getScripture.controller");
const { stubFindOneScripture } = require("../helpers/helper.sinon");

// get scripture by id test
describe("GET SCRIPTURE BY ID E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const paramsData = { ...scriptureData.paramsData.valid };
    const foundData = { ...scriptureData.foundData.valid };

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

    it("should get scripture by id successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneScripture(foundData);

      await getScriptureCtrl(req, res);

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
    const foundData = scriptureData.foundData.invalid;

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

    it("should not get scripture by id successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneScripture(foundData);

      await getScriptureCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Scripture does not exist");
    });
  });

});
