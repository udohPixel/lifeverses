// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const personalUserData = require("./getPersonalUser.data.mock.json");
const User = require("../../user/models/User");
const getPersonalUserCtrl = require("../../user/controllers/getPersonalUser.controller");
const { stubFindOneUserQuery3 } = require("../helpers/helper.sinon");

// get personal user test
describe("GET PERSONAL USER E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const userData = { ...personalUserData.userData.valid };
    const foundData = { ...personalUserData.foundData.valid };

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

    it("should get personal user successfully", async () => {
      const req = {
        user: userData
      };

      const stubFind = stubFindOneUserQuery3(foundData);

      await getPersonalUserCtrl(req, res);

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
    const userData = { ...personalUserData.userData.invalid };
    const foundData = personalUserData.foundData.invalid;

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

    it("should not get personal user successfully", async () => {
      const req = {
        user: userData
      };

      const stubFind = stubFindOneUserQuery3(foundData);

      await getPersonalUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("User does not exist");
    });
  });

});
