// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./getAllProducts.data.mock.json");
const Product = require("../../product/models/Product");
const getAllProductsCtrl = require("../../product/controllers/getAllProducts.controller");
const { stubFindAllProducts } = require("../helpers/helper.sinon");

// get all products test
describe("GET ALL PRODUCTS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const queryData = { ...productData.queryData.valid };
    const foundData = { ...productData.foundData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.find.restore();
    });

    it("should get all products successfully", async () => {
      const req = {
        query: queryData
      };

      const stubFind = stubFindAllProducts(foundData);

      await getAllProductsCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Products found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

});
