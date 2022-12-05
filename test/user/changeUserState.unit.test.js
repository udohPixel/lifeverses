// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const userData = require("./changeUserState.data.mock.json");
const User = require("../../user/models/User");
const changeUserStateService = require("../../user/services/changeUserState.service");
const { stubFindOneUser } = require("../helpers/helper.sinon");

// change user state test
describe("CHANGE USER STATE UNIT TEST", () => {
  const paramsData = { ...userData.paramsData.valid };
  const foundData = { ...userData.foundData.valid };

  afterEach(() => {
    User.findOne.restore();
    User.updateOne.restore();
  });

  it("should change a user active state successfully", async () => {
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
      "isActive": true,
      "favouriteScriptures": foundData.favouriteScriptures,
      "createdAt": foundData.createdAt,
      "updatedAt": foundData.updatedAt
    };

    const stubFind = stubFindOneUser(foundData);
    const stubUpdate = sinon.stub(User, "updateOne").resolves();

    const response = await changeUserStateService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    const stubUpdateCallArg = stubUpdate.getCalls()[0].args[0];
    expect(stubUpdateCallArg).to.be.an('object');
    expect(stubUpdateCallArg._id).to.equal(paramsData.id);
    expect(response).to.be.an("boolean");
    expect(response).to.equal(stubData.isActive);
  });
});
