// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./updateSituation.data.mock.json");
const Situation = require("../../situation/models/Situation");
const updateSituationCtrl = require("../../situation/controllers/updateSituation.controller");
const { titleToSlug } = require("../../common/helpers");
const { stubFindOneSituation } = require("../helpers/helper.sinon");

// update situation test
describe("UPDATE SITUATION E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const inputData = { ...situationData.bodyData.valid };
    const paramsData = { ...situationData.paramsData.valid };
    const foundData = { ...situationData.foundData.valid };

    const stubData = {
      "id": inputData.situationId,
      "title": inputData.title,
      "slug": titleToSlug(inputData.title),
      "colour": inputData.colour,
      "icon": inputData.icon,
      "createdAt": "2022-11-09T12:30:06.312Z",
      "updatedAt": "2022-12-05T12:30:06.312Z",
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
      Situation.findOneAndUpdate.restore();
    });

    it("should update a situation successfully", async () => {
      const req = {
        body: inputData,
        params: paramsData
      };

      const stubFind = stubFindOneSituation(foundData);
      const stubUpdate = sinon.stub(Situation, "findOneAndUpdate").resolves(stubData);

      await updateSituationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Situation updated successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe("NEGATIVE TEST", () => {
    const inputData = { ...situationData.bodyData.invalid };
    inputData.title = Date.now() + "_" + inputData.title;
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

    it("should not update a situation successfully when situation is not found by id", async () => {
      const req = {
        body: inputData,
        params: paramsData,
      };

      const stubFind = stubFindOneSituation(foundData);

      await updateSituationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Situation does not exist");
    });
  });

});
