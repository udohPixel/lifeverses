// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const updateData = require("./updateUser.data.mock.json");
const User = require("../../user/models/User");
const updateUserService = require("../../user/services/updateUser.service");
const { stubFindByIdUser, stubFindOneUserQuery } = require("../helpers/helper.sinon");

// update user test
describe("UPDATE USER UNIT TEST", () => {
  const inputData = { ...updateData.bodyData.valid.userInfo };
  const paramsData = { ...updateData.paramsData.valid };
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
  };

  afterEach(() => {
    User.findOne.restore();
  });

  after(() => {
    User.findById.restore();
    User.findOneAndUpdate.restore();
  });

  it("should update user information successfully", async () => {
    const stubFindById = stubFindByIdUser(foundData);
    const stubFindOne = stubFindOneUserQuery(foundDataNone);
    const stubUpdate = sinon.stub(User, "findOneAndUpdate").resolves(stubData);

    const userInfo = { ...inputData };

    const response = await updateUserService(userData.id, paramsData.id, userInfo);

    expect(stubFindById.calledOnce).to.be.true;
    expect(stubFindOne.calledTwice).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", stubData.id);
    expect(response).to.have.property("firstname", stubData.firstname);
    expect(response).to.have.property("lastname", stubData.lastname);
    expect(response).to.have.property("gender", stubData.gender);
    expect(response).to.have.property("username", stubData.username);
    expect(response).to.have.property("email", stubData.email);
    expect(response).to.have.property("profilePic", stubData.profilePic);
    expect(response).to.have.property("careerField", stubData.careerField);
    expect(response).to.have.property("isActive", stubData.isActive);
    expect(response).to.have.property("favouriteScriptures", stubData.favouriteScriptures);
    expect(response).to.have.property("facebook", stubData.facebook);
    expect(response).to.have.property("twitter", stubData.twitter);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });

});
