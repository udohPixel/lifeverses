// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const updateData = require("./updatePersonalUser.data.mock.json");
const User = require("../../user/models/User");
const updatePersonalUserCtrl = require("../../user/controllers/updatePersonalUser.controller");
const { stubFindByIdUser, stubFindOneUserQuery } = require("../helpers/helper.sinon");

// update personal user test
describe("UPDATE PERSONAL USER E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const inputData = { ...updateData.bodyData.valid.userInfo };
    const userData = { ...updateData.userData.valid };
    const foundData = { ...updateData.foundData.valid };
    const foundDataNone = updateData.foundData.valid1;

    const stubData = {
      "id": "636b9a3d4f562bab327b163e",
      "firstname": inputData.firstname,
      "lastname": inputData.lastname,
      "gender": inputData.gender,
      "username": inputData.username,
      "email": inputData.email,
      "profilePic": "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg",
      "careerField": inputData.careerField,
      "facebook": inputData.facebook,
      "twitter": inputData.twitter,
      "isActive": true,
      "favouriteScriptures": [],
      "createdAt": "2022-11-09T12:40:46.128Z",
      "updatedAt": "2022-11-09T12:40:46.128Z"
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
    });

    after(() => {
      User.findById.restore();
      User.findOneAndUpdate.restore();
    });

    it("should update a user successfully", async () => {
      const req = {
        body: inputData,
        user: userData
      };

      const stubFindById = stubFindByIdUser(foundData);
      const stubFindOne = stubFindOneUserQuery(foundDataNone);
      const stubUpdate = sinon.stub(User, "findOneAndUpdate").resolves(stubData);

      const userInfo = { ...inputData };

      await updatePersonalUserCtrl(req, res);

      expect(stubFindById.calledOnce).to.be.true;
      expect(stubFindOne.calledTwice).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Profile updated successfully");
      expect(json.args[0][0].data).to.equal(stubData);
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

    afterEach(() => {
      User.findById.restore();
    });

    it("should not update a user successfully when user is not found", async () => {
      const inputData = { ...updateData.bodyData.valid.userInfo };
      const userData = { ...updateData.userData.valid };
      const foundData = updateData.foundData.valid1;

      const req = {
        body: inputData,
        user: userData
      };

      const stubFind = stubFindByIdUser(foundData);

      const userInfo = { ...inputData };

      await updatePersonalUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("User does not exist");
    });

    it("should not update a user successfully when user is found with same email", async () => {
      const inputData = { ...updateData.bodyData.valid.userInfo };
      const userData = { ...updateData.userData.valid };
      const foundData = { ...updateData.foundData.valid };
      const foundData1 = { ...updateData.foundData.invalid1 };

      const req = {
        body: inputData,
        user: userData
      };

      const stubFind = stubFindByIdUser(foundData);
      const stubFindEmail = stubFindOneUserQuery(foundData1);

      const userInfo = { ...inputData };

      await updatePersonalUserCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubFindEmail.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(409);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Email has already been taken. Try another");
    });
  });

});
