// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const favouriteData = require("./addToFavourite.data.mock.json");
const Scripture = require("../../scripture/models/Scripture");
const User = require("../../user/models/User");
const addToFavouriteCtrl = require("../../user/controllers/addToFavourite.controller");
const { stubFindByIdUser, stubFindOneScripture, stubByIdUpdateUser } = require("../helpers/helper.sinon");

// add to favourite test
describe("ADD TO FAVOURITE E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const inputData = { ...favouriteData.bodyData.valid };
    const userData = { ...favouriteData.userData.valid };
    const foundData = { ...favouriteData.foundData.valid };
    const foundData2 = { ...favouriteData.foundData.valid2 };
    const foundData1 = { ...favouriteData.foundData.valid1 };

    const stubData = [
      "638461fd5a145a04e704ca0b",
      "638461d45a145a04e704ca07"
    ];

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.findById.restore();
      Scripture.findOne.restore();
      User.findByIdAndUpdate.restore();
      User.findOne.restore();
    });

    it("should add scripture to favourite successfully", async () => {
      const req = {
        body: inputData,
        user: userData
      };

      const stubFindUser = stubFindByIdUser(foundData2);
      const stubFindScripture = stubFindOneScripture(foundData);
      const stubUpdate = stubByIdUpdateUser(stubData);
      const stubFind = sinon.stub(User, "findOne").resolves(foundData1);

      await addToFavouriteCtrl(req, res);

      expect(stubFindUser.calledOnce).to.be.true;
      expect(stubFindScripture.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(stubFind.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Scripture was added to favourite successfully");
      expect(typeof json.args[0][0].data).to.equal(typeof stubData);
    });

  });

  describe("NEGATIVE TEST", () => {
    const inputData = { ...favouriteData.bodyData.invalid };
    const userData = { ...favouriteData.userData.valid };
    const foundData2 = { ...favouriteData.foundData.valid2 };
    const foundDataNone = favouriteData.foundData.invalid;

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.findById.restore();
      Scripture.findOne.restore();
    });

    it("should not add scripture to favourite successfully when scripture is not found", async () => {
      const req = {
        body: inputData,
        user: userData
      };

      const stubFindUser = stubFindByIdUser(foundData2);
      const stubFindScripture = stubFindOneScripture(foundDataNone);

      await addToFavouriteCtrl(req, res);

      expect(stubFindUser.calledOnce).to.be.true;
      expect(stubFindScripture.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Scripture does not exist");
    });
  });

});
