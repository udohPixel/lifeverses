// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./getAllPersonalScriptures.data.mock.json");
const Scripture = require("../../scripture/models/Scripture");
const getAllPersonalScripturesCtrl = require("../../scripture/controllers/getAllPersonalScriptures.controller");
const { stubFindAllPersonalScriptures } = require("../helpers/helper.sinon");

// get all personal scriptures test
describe("GET ALL PERSONAL SCRIPTURES E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const queryData = { ...scriptureData.queryData.valid };
    const userData = { ...scriptureData.userData.valid };
    const foundData = { ...scriptureData.foundData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Scripture.find.restore();
    });

    it("should get all personal scriptures successfully", async () => {
      const req = {
        query: queryData,
        user: userData
      };

      const stubFind = stubFindAllPersonalScriptures(foundData);

      await getAllPersonalScripturesCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Scriptures found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

});
