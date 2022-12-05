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
const registrationService = require("../../user/services/registration.service");
const { stubFindOneUser, stubFindUser } = require("../helpers/helper.sinon");

// user registration test
describe("REGISTER USER UNIT TEST", () => {
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

  after(() => {
    User.findOne.restore();
    User.find.restore();
    User.create.restore();
  });

  it("should create registration successfully", async () => {
    const stubFind = stubFindOneUser(foundData);
    const stubFind1 = stubFindUser(foundData);
    const stubCreate = sinon.stub(User, "create").resolves(stubData);

    const userInfo = { ...inputData };

    const response = await registrationService(userInfo);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubFind.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", stubData.id);
    expect(response).to.have.property("firstname", stubData.firstname);
    expect(response).to.have.property("lastname", stubData.lastname);
    expect(response).to.have.property("gender", stubData.gender);
    expect(response).to.have.property("username", stubData.username);
    expect(response).to.have.property("email", stubData.email);
    expect(response).to.have.property("password", stubData.password);
    expect(response).to.have.property("profilePic", stubData.profilePic);
    expect(response).to.have.property("careerField", stubData.careerField);
    expect(response).to.have.property("isActive", stubData.isActive);
    expect(response).to.have.property("favouriteScriptures", stubData.favouriteScriptures);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });

});
