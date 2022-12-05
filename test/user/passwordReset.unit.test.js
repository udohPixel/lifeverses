// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const nodeMailer = require("nodemailer");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const passwordResetData = require("./passwordReset.data.mock.json");
const PasswordReset = require("../../user/models/PasswordReset");
const User = require("../../user/models/User");
const passwordResetService = require("../../user/services/passwordReset.service");
const { stubFindOneResetToken, stubFindUser, stubUpdateUser, stubCreateTransport } = require("../helpers/helper.sinon");

// password reset user test
describe("PASSWORD RESET UNIT TEST", () => {
  const inputData = { ...passwordResetData.bodyData.valid };
  const paramsData = passwordResetData.paramsData.valid;
  const foundResetTokenData = { ...passwordResetData.foundData.valid };
  const foundUserData = { ...passwordResetData.foundData.valid1 };

  const stubUpdateData = {
    "id": foundUserData.id,
    "firstname": foundUserData.firstname,
    "lastname": foundUserData.lastname,
    "gender": foundUserData.gender,
    "username": foundUserData.username,
    "email": foundUserData.email,
    "password": inputData.password,
    "profilePic": foundUserData.profilePic,
    "careerField": foundUserData.careerField,
    "isActive": foundUserData.isActive,
    "favouriteScriptures": foundUserData.favouriteScriptures,
    "createdAt": foundUserData.createdAt,
    "updatedAt": foundUserData.updatedAt
  };

  const stubMailTransportData = {
    "email": "john.doe123@gmail.com",
    "subject": "LifeVerses account password reset",
    "message": "<div><h2>Your password was changed successfully.</h2><p>Your new password is " +
      inputData.password +
      "</p></div>"
  };

  afterEach(() => {
    PasswordReset.findOne.restore();
    User.find.restore();
    User.findOneAndUpdate.restore();
    nodeMailer.createTransport.restore();
  });

  it("should create password reset token successfully", async () => {
    const stubResetToken = stubFindOneResetToken(foundResetTokenData);
    const stubFind = stubFindUser(foundUserData);
    const stubUpdate = stubUpdateUser(stubUpdateData);
    const stubMailer = stubCreateTransport(stubMailTransportData);

    const response = await passwordResetService(paramsData.token, inputData.password);

    expect(stubResetToken.calledOnce).to.be.true;
    expect(stubFind.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(stubMailer.calledOnce).to.be.true;
    // const stubResetTokenCallArg = stubResetToken.getCalls()[0].args[0];
    // expect(stubResetTokenCallArg).to.be.an('object');
    // expect(stubResetTokenCallArg.token).to.equal(paramsData.token);
    expect(response).to.be.a("string");
  });

});
