// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const userData = require("./changeUserState.data.mock.json");
const User = require("../../user/models/User");
const changeUserStateCtrl = require("../../user/controllers/changeUserState.controller");
const { stubFindOneUser } = require("../helpers/helper.sinon");

// change user state test
describe("CHANGE USER STATE E2E TEST", () => {
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
      User.updateOne.restore();
    });

    it("should change a user active state successfully", async () => {
      const stubData = {
        "id": foundData.id,
        "firstname": foundData.firstname,
        "lastname": foundData.lastname,
        "gender": foundData.gender,
        "username": foundData.username,
        "email": foundData.email,
        "password": foundData.password,
        "profilePic": foundData.profilePic,
        "careerField": foundData.careerField,
        "isActive": true,
        "favouriteScriptures": foundData.favouriteScriptures,
        "createdAt": foundData.createdAt,
        "updatedAt": foundData.updatedAt
      };

      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneUser(foundData);
      const stubUpdate = sinon.stub(User, "updateOne").resolves();

      await changeUserStateCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("User state changed successfully");
      expect(json.args[0][0].data).to.equal(stubData.isActive);
    });
  });

  describe("NEGATIVE TEST", () => {
    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.findOne.restore();
    })

    it("should not change a user active state successfully when user is not found by id", async () => {
      const paramsData = { ...userData.paramsData.invalid };
      const foundData = userData.foundData.invalid;

      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneUser(foundData);

      await changeUserStateCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("User does not exist");
    });
  });

});
