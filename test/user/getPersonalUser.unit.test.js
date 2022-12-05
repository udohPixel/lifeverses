// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const personalUserData = require("./getPersonalUser.data.mock.json");
const User = require("../../user/models/User");
const getPersonalUserService = require("../../user/services/getPersonalUser.service");
const { stubFindOneUserQuery3 } = require("../helpers/helper.sinon");

// get personal user test
describe("GET PERSONAL USER UNIT TEST", () => {
  const userData = { ...personalUserData.userData.valid };
  const foundData = { ...personalUserData.foundData.valid };

  afterEach(() => {
    User.findOne.restore();
  });

  it("should get personal user successfully", async () => {
    const stubFind = stubFindOneUserQuery3(foundData);

    const response = await getPersonalUserService(userData.username);

    expect(stubFind.calledOnce).to.be.true;
    const stubFindCallArg = stubFind.getCalls()[0].args[0];
    expect(stubFindCallArg).to.be.an('object');
    expect(stubFindCallArg.username).to.equal(userData.username);
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", foundData.id);
    expect(response).to.have.property("firstname", foundData.firstname);
    expect(response).to.have.property("lastname", foundData.lastname);
    expect(response).to.have.property("gender", foundData.gender);
    expect(response).to.have.property("username", foundData.username);
    expect(response).to.have.property("email", foundData.email);
    expect(response).to.have.property("password", foundData.password);
    expect(response).to.have.property("profilePic", foundData.profilePic);
    expect(response).to.have.property("careerField", foundData.careerField);
    expect(response).to.have.property("isActive", foundData.isActive);
    expect(response).to.have.property("favouriteScriptures", foundData.favouriteScriptures);
    expect(response).to.have.property("createdAt", foundData.createdAt);
    expect(response).to.have.property("updatedAt", foundData.updatedAt);
  });

});
