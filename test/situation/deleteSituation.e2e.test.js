// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./deleteSituation.data.mock.json");
const Situation = require("../../situation/models/Situation");
const deleteSituationCtrl = require("../../situation/controllers/deleteSituation.controller");
const { stubFindOneSituation } = require("../helpers/helper.sinon");

// delete situation test
describe("DELETE SITUATION E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const paramsData = { ...situationData.paramsData.valid };
    const foundData = { ...situationData.foundData.valid };

    const stubData = {
      "id": foundData.situationId,
      "title": foundData.title,
      "slug": foundData.slug,
      "colour": foundData.colour,
      "icon": foundData.icon,
      "createdAt": foundData.createdAt,
      "updatedAt": foundData.updatedAt,
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
      Situation.findOneAndRemove.restore();
    });

    it("should delete a situation successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneSituation(foundData);
      const stubDelete = sinon.stub(Situation, "findOneAndRemove").resolves(stubData);

      await deleteSituationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Situation deleted successfully");
      expect(json.args[0][0].data).to.equal(stubData);
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
    })

    it("should not delete a situation successfully when situation is not found by id", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneSituation(foundData);

      await deleteSituationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Situation does not exist");
    });
  });

});
