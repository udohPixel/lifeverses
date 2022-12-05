// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./getAllSituations.data.mock.json");
const Situation = require("../../situation/models/Situation");
const getAllSituationsCtrl = require("../../situation/controllers/getAllSituations.controller");
const { stubFindAllSituations } = require("../helpers/helper.sinon");

// get all situations test
describe("GET ALL SITUATIONS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const foundData = { ...situationData.foundData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Situation.find.restore();
    });

    it("should get all situations successfully", async () => {
      const _req = {};

      const stubFind = stubFindAllSituations(foundData);

      await getAllSituationsCtrl(_req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Situations found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

});
