// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const userData = require("./getUser.data.mock.json");
const User = require("../../user/models/User");
const getUserCtrl = require("../../user/controllers/getUser.controller");
const { stubFindOneUserQuery2 } = require("../helpers/helper.sinon");

// get user test
describe("GET USER E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const paramsData = { ...userData.paramsData.valid };
    const foundData = { ...userData.foundData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.findOne.restore();
    });

    it("should get user successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneUserQuery2(foundData);

      await getUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("User found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

  describe("NEGATIVE TEST", () => {
    const paramsData = { ...userData.paramsData.invalid };
    const foundData = userData.foundData.invalid;

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.findOne.restore();
    });

    it("should not get user successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneUserQuery2(foundData);

      await getUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("User does not exist");
    });
  });

});
