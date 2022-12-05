// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const userData = require("./getAllUsers.data.mock.json");
const User = require("../../user/models/User");
const getAllUsersCtrl = require("../../user/controllers/getAllUsers.controller");
const { stubFindUserQuery } = require("../helpers/helper.sinon");

// get all users test
describe("GET ALL USERS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const queryData = { ...userData.queryData.valid };
    const foundData = { ...userData.foundData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.find.restore();
    });

    it("should get all users successfully", async () => {
      const req = {
        query: queryData
      };

      const stubFind = stubFindUserQuery(foundData);

      await getAllUsersCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Users found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

});
