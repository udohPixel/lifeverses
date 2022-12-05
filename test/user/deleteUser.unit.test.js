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
const deleteUserService = require("../../user/services/deleteUser.service");
const { stubFindOneUser } = require("../helpers/helper.sinon");

// delete user test
describe("DELETE USER UNIT TEST", () => {
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

  afterEach(() => {
    User.findOne.restore();
    User.findOneAndRemove.restore();
  });

  it("should delete a user successfully", async () => {
    const stubFind = stubFindOneUser(foundData);
    const stubDelete = sinon.stub(User, "findOneAndRemove").resolves(stubData);

    const response = await deleteUserService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
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
