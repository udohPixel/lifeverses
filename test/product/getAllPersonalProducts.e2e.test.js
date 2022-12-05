// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./getAllPersonalProducts.data.mock.json");
const Product = require("../../product/models/Product");
const User = require("../../user/models/User");
const getAllPersonalProductsCtrl = require("../../product/controllers/getAllPersonalProducts.controller");
const { stubFindAllPersonalProducts, stubFindOneUser } = require("../helpers/helper.sinon");

// get all personal products test
describe("GET ALL PRODUCTS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const paramsData = { ...productData.paramsData.valid };
    const queryData = { ...productData.queryData.valid };
    const foundData = { ...productData.foundData.valid };

    const stubData = {
      "id": "636b9a3d4f562bab327b163e",
      "firstname": "Udoh",
      "lastname": "Ndem",
      "gender": "Male",
      "username": "ipixel",
      "email": "udohndem@gmail.com",
      "profilePic": "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg",
      "careerField": "Information Technology",
      "isActive": false,
      "favouriteScriptures": [],
      "createdAt": "2022-11-09T12:17:02.106Z",
      "updatedAt": "2022-11-09T12:17:02.106Z",
    }

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.findOne.restore();
      Product.find.restore();
    });

    it("should get all personal products successfully", async () => {
      const stubFindUser = stubFindOneUser(stubData);
      const stubFind = stubFindAllPersonalProducts(foundData);

      const req = {
        params: paramsData,
        query: queryData,
      };

      await getAllPersonalProductsCtrl(req, res);

      expect(stubFindUser.calledOnce).to.be.true;
      expect(stubFind.calledOnce).to.be.true;
      const stubFindUserCallArg = stubFindUser.getCalls()[0].args[0];
      expect(stubFindUserCallArg).to.be.an('object');
      expect(stubFindUserCallArg.username).to.equal(paramsData.username);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Products found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

  describe("NEGATIVE TEST", () => {
    const paramsData = { ...productData.paramsData.invalid };

    const stubData = null;

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      User.findOne.restore();
    });

    it("should get all personal products successfully when user is not found", async () => {
      const stubFindUser = stubFindOneUser(stubData);

      const req = {
        params: paramsData
      };

      await getAllPersonalProductsCtrl(req, res);

      expect(stubFindUser.calledOnce).to.be.true;
      const stubFindUserCallArg = stubFindUser.getCalls()[0].args[0];
      expect(stubFindUserCallArg).to.be.an('object');
      expect(stubFindUserCallArg.username).to.equal(paramsData.username);
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("User does not exist");
    });
  });

});
