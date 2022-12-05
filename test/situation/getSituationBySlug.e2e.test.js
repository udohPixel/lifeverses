// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./getSituationBySlug.data.mock.json");
const Situation = require("../../situation/models/Situation");
const getSituationCtrl = require("../../situation/controllers/getSituationBySlug.controller");
const { stubFindOneSituation } = require("../helpers/helper.sinon");

// get situation by slug test
describe("GET SITUATION BY SLUG E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const paramsData = { ...situationData.paramsData.valid };
    const foundData = { ...situationData.foundData.valid };

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

    it("should get situation by slug successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneSituation(foundData);

      await getSituationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Situation found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

  describe("NEGATIVE TEST", () => {
    const paramsData = { ...situationData.paramsData.invalid };
    const foundData = situationData.foundData.invalid;

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

    it("should not get situation by slug successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneSituation(foundData);

      await getSituationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Situation does not exist");
    });
  });

});
