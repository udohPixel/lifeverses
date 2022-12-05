// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const userData = require("./deleteUser.data.mock.json");
const User = require("../../user/models/User");
const deleteUserCtrl = require("../../user/controllers/deleteUser.controller");
const { stubFindOneUser } = require("../helpers/helper.sinon");

// delete user test
describe("DELETE USER E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const paramsData = { ...userData.paramsData.valid };
    const foundData = { ...userData.foundData.valid };

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
      "isActive": foundData.isActive,
      "favouriteScriptures": foundData.favouriteScriptures,
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
      User.findOne.restore();
      User.findOneAndRemove.restore();
    });

    it("should delete a user successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneUser(foundData);
      const stubDelete = sinon.stub(User, "findOneAndRemove").resolves(stubData);

      await deleteUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("User deleted successfully");
      expect(json.args[0][0].data).to.equal(stubData);
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
    })

    it("should not delete a user successfully when user is not found by id", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneUser(foundData);

      await deleteUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("User does not exist");
    });
  });

});
