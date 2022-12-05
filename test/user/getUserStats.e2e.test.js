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
const getUserStatsCtrl = require("../../user/controllers/getUserStats.controller");

// get user stats test
describe("GET USER STATISTICS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const foundData = userData.foundData.valid;

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.aggregate.restore();
    });

    it("should get user stats successfully", async () => {
      const _req = {};

      const stubFind = sinon.stub(User, "aggregate").resolves(foundData);

      await getUserStatsCtrl(_req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("User statistics loaded successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

});
