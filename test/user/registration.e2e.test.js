// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const registrationData = require("./registration.data.mock.json");
const User = require("../../user/models/User");
const registrationCtrl = require("../../user/controllers/registration.controller");
const { stubFindOneUser, stubFindUser } = require("../helpers/helper.sinon");

// user registration test
describe("REGISTER USER E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const inputData = { ...registrationData.bodyData.valid.userInfo };
    const foundData = registrationData.foundData.valid;

    const stubData = {
      "id": "636b9fcd18029dcbc8e3337b",
      "firstname": inputData.firstname,
      "lastname": inputData.lastname,
      "gender": inputData.gender,
      "username": inputData.username,
      "email": inputData.email,
      "password": inputData.password,
      "profilePic": "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg",
      "careerField": inputData.careerField,
      "isActive": false,
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

    after(() => {
      User.findOne.restore();
      User.find.restore();
      User.create.restore();
    });

    it("should register user successfully", async () => {
      const req = {
        body: { ...inputData }
      };

      const stubFind = stubFindOneUser(foundData);
      const stubFind1 = stubFindUser(foundData);
      const stubCreate = sinon.stub(User, "create").resolves(stubData);

      await registrationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubFind1.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Registration successful");
      expect(json.args[0][0].data).to.equal(stubData);
    });

  });

  describe("NEGATIVE TEST", () => {
    const inputData = { ...registrationData.bodyData.valid.userInfo };
    const foundData = { ...registrationData.foundData.invalid };
    const foundDataNone = registrationData.foundData.valid;
    const foundData1 = { ...registrationData.foundData.invalid1 };

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

    after(() => {
      User.find.restore();
    });

    it("should not register user successfully when user is found with same email", async () => {
      const req = {
        body: { ...inputData }
      };

      const stubFind = stubFindOneUser(foundData);

      await registrationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Email has already been taken. Try another");
    });

    it("should not register user successfully when user is found with same username", async () => {
      const req = {
        body: { ...inputData }
      };

      const stubFind = stubFindOneUser(foundDataNone);
      const stubFind1 = stubFindUser(foundData1);

      await registrationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubFind1.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Username has already been taken. Try another");
    });
  });

});
