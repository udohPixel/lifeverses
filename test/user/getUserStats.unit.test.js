// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const userData = require("./getUserStats.data.mock.json");
const User = require("../../user/models/User");
const getUserStatsService = require("../../user/services/getUserStats.service");

// get user stats unit test
describe("GET USER STATISTICS UNIT TEST", () => {
  const foundData = userData.foundData.valid;

  afterEach(() => {
    User.aggregate.restore();
  });

  it("should get user stats successfully", async () => {
    const stubFind = sinon.stub(User, "aggregate").resolves(foundData);

    const response = await getUserStatsService();

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("array");
    expect(response).to.be.an("array").that.is.not.empty;
  });

});
