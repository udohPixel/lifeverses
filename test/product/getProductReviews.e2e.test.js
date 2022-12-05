// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./getProductReviews.data.mock.json");
const Product = require("../../product/models/Product");
const getProductReviewsCtrl = require("../../product/controllers/getProductReviews.controller");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// get product reviews test
describe("GET PRODUCT REVIEWS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const paramsData = { ...productData.paramsData.valid };
    const foundData = { ...productData.foundData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.findOne.restore();
    });

    it("should get product reviews successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneProduct(foundData);

      await getProductReviewsCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Reviews found successfully");
      expect(json.args[0][0].data).to.equal(foundData.reviews);
    });
  });

  describe("NEGATIVE TEST", () => {
    const paramsData = { ...productData.paramsData.invalid };
    const foundData = productData.foundData.invalid;

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.findOne.restore();
    });

    it("should not get product reviews successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneProduct(foundData);

      await getProductReviewsCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Product does not exist");
    });
  });

});
