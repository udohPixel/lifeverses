// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const userData = require("./getUser.data.mock.json");
const User = require("../../user/models/User");
const getUserService = require("../../user/services/getUser.service");
const { stubFindOneUserQuery2 } = require("../helpers/helper.sinon");

// get user test
describe("GET USER UNIT TEST", () => {
  const paramsData = { ...userData.paramsData.valid };
  const foundData = { ...userData.foundData.valid };

  afterEach(() => {
    User.findOne.restore();
  });

  it("should get user successfully", async () => {
    const stubFind = stubFindOneUserQuery2(foundData);

    const response = await getUserService(paramsData.username);

    expect(stubFind.calledOnce).to.be.true;
    const stubFindCallArg = stubFind.getCalls()[0].args[0];
    expect(stubFindCallArg).to.be.an('object');
    expect(stubFindCallArg.username).to.equal(paramsData.username);
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
