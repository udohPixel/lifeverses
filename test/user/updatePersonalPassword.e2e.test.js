// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const nodeMailer = require("nodemailer");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const updateData = require("./updatePersonalPassword.data.mock.json");
const User = require("../../user/models/User");
const updatePersonalPasswordCtrl = require("../../user/controllers/updatePersonalPassword.controller");
const { stubFindOneUser, stubCreateTransport } = require("../helpers/helper.sinon");

// update personal password test
describe("UPDATE PERSONAL PASSWORD E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const inputData = { ...updateData.bodyData.valid };
    const userData = { ...updateData.userData.valid };
    const foundData = { ...updateData.foundData.valid };

    const stubData = {
      "id": foundData.id,
      "firstname": foundData.firstname,
      "lastname": foundData.lastname,
      "gender": foundData.gender,
      "username": foundData.username,
      "email": foundData.email,
      "password": inputData.password,
      "profilePic": foundData.profilePic,
      "careerField": foundData.careerField,
      "facebook": foundData.facebook,
      "twitter": foundData.twitter,
      "isActive": foundData.isActive,
      "favouriteScriptures": foundData.favouriteScriptures,
      "createdAt": foundData.createdAt,
      "updatedAt": foundData.updatedAt
    };

    const stubMailTransportData = {
      "email": foundData.email,
      "subject": "Your LifeVerses account password has been changed",
      "message": "<div><h2>Sending some HTML to test. Your password was changed successfully.</h2><p></p></div>"
    };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    after(() => {
      User.findOne.restore();
      User.findOneAndUpdate.restore();
      nodeMailer.createTransport.restore();
    });

    it("should update personal password successfully", async () => {
      const req = {
        body: inputData,
        user: userData
      };

      const stubFind = stubFindOneUser(foundData);
      const stubUpdate = sinon.stub(User, "findOneAndUpdate").resolves(stubData);
      const stubMailer = stubCreateTransport(stubMailTransportData);

      await updatePersonalPasswordCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(stubMailer.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Password updated successfully");
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

    after(() => {
      User.findOne.restore();
    });

    it("should not update personal password successfully when user is not found", async () => {
      const inputData = { ...updateData.bodyData.valid };
      const userData = { ...updateData.userData.valid };
      const foundData = updateData.foundData.invalid;

      const req = {
        body: inputData,
        user: userData
      };

      const stubFind = stubFindOneUser(foundData);

      await updatePersonalPasswordCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("User does not exist");
    });
  });

});
