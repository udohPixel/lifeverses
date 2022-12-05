// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const loginData = require("./login.data.mock.json");
const token = require("../helpers/helper.auth.token.mock.json")
const User = require("../../user/models/User");
const loginService = require("../../user/services/login.service");
const { stubFindOneUser } = require("../helpers/helper.sinon");

// login user test
describe("LOGIN UNIT TEST", () => {
  const inputData = { ...loginData.bodyData.valid };
  const foundData = { ...loginData.foundData.valid };

  const stubData = token.token;

  afterEach(() => {
    User.findOne.restore();
    jwt.sign.restore();
  });

  it("should log in user successfully", async () => {
    const stubFind = stubFindOneUser(foundData);
    const stubSign = sinon.stub(jwt, "sign").resolves(stubData);

    const response = await loginService(inputData.email, inputData.password);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubSign.calledOnce).to.be.true;
    expect(response).to.be.a("string");
    expect(response).to.equal(stubData);
  });

});
