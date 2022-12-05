// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const userData = require("./getAllUsers.data.mock.json");
const User = require("../../user/models/User");
const getAllUsersService = require("../../user/services/getAllUsers.service");
const { stubFindUserQuery } = require("../helpers/helper.sinon");

// get all user unit test
describe("GET ALL USERS UNIT TEST", () => {
  const queryData = { ...userData.queryData.valid };
  const foundData = { ...userData.foundData.valid };

  afterEach(() => {
    User.find.restore();
  });

  it("should get all users successfully", async () => {
    const stubFind = stubFindUserQuery(foundData);

    const response = await getAllUsersService(queryData);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
