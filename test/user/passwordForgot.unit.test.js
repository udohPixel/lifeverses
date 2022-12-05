// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");
const PasswordReset = require("../../user/models/PasswordReset");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const passwordForgotData = require("./passwordForgot.data.mock.json");
const token = require("../helpers/helper.auth.token.mock.json")
const User = require("../../user/models/User");
const passwordForgotService = require("../../user/services/passwordForgot.service");
const { stubFindOneUser, stubCreateHash, stubCreateTransport } = require("../helpers/helper.sinon");

// password forgot user test
describe("PASSWORD FORGOT UNIT TEST", () => {
  const inputData = { ...passwordForgotData.bodyData.valid };
  const protocolData = passwordForgotData.protocolData.valid;
  const hostData = passwordForgotData.hostData.valid;
  const foundData = { ...passwordForgotData.foundData.valid };

  const stubRandomBytes = token.randomByte;
  const stubResetTokenData = token.resetToken;

  const stubCreateData = {
    "id": "63889532461dcb7265916d7f",
    "email": "john.doe123@gmail.com",
    "passwordResetToken": "489e6170cfd8a6c2bec415f613881332e8defb201caf3c9cac4fd72801d3e8d224cf1ffc67e56b7d2e1b606d16047c650fe0b2aea2c0284c1dc2a6cf68a5db0c",
    "passwordResetExpirationDate": "2022-12-04T11:50:21.898+00:00",
    "createdAt": "2022-12-01T11:50:21.123Z",
    "updatedAt": "2022-12-01T11:50:21.123Z"
  };

  let link = protocolData + "://" + hostData + "/password/reset/" + stubResetTokenData;
  const stubMailTransportData = {
    "email": "john.doe123@gmail.com",
    "subject": "LifeVerses account password reset",
    "message": "<div style='background-color: #ffffff; color: #000000'><h2>Please confirm the reset of your password by clicking the button below:</h2></div> <div><a target='_blank'  href='" +
      link +
      "' data-saferedirecturl='https://www.google.com/url?q=" +
      link +
      "'>Reset Password</a></div>"
  };

  after(() => {
    User.findOne.restore();
    crypto.randomBytes.restore();
    crypto.createHash.restore();
    nodeMailer.createTransport.restore();
    PasswordReset.create.restore();
  });

  it("should create password reset token successfully", async () => {
    const stubFind = stubFindOneUser(foundData);
    const stubToken = sinon.stub(crypto, "randomBytes").resolves(stubRandomBytes);
    const stubResetToken = stubCreateHash(stubResetTokenData);
    const stubCreate = sinon.stub(PasswordReset, "create").resolves(stubCreateData);
    const stubMailer = stubCreateTransport(stubMailTransportData);

    const response = await passwordForgotService(inputData.email, protocolData);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubToken.calledOnce).to.be.true;
    expect(stubResetToken.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
    expect(stubMailer.calledOnce).to.be.true;
    // const stubResetTokenCallArg = stubResetToken.getCalls()[0].args[0];
    // expect(stubResetTokenCallArg).to.be.an('string');
    // expect(stubResetTokenCallArg.token).to.equal(inputData.email);
    expect(response).to.be.a("string");
    expect(response).to.equal(stubResetTokenData);
  });

});
