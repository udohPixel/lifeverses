// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const cartData = require("./addCart.data.mock.json");
const Product = require("../../product/models/Product");
const Cart = require("../../cart/models/Cart");
const addToCartCtrl = require("../../cart/controllers/addToCart.controller");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// add product to cart test
describe("ADD PRODUCT TO CART E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const inputData = { ...cartData.bodyData.valid };
    const userData = { ...cartData.userData.valid };
    const foundData = { ...cartData.foundData.valid };

    const stubData = {
      "id": "637767ce0bf8ba4efccd1aab",
      "userId": "636b9a3d4f562bab327b163e",
      "productId": inputData.productId,
      "quantity": inputData.quantity,
      "createdAt": "2022-11-18T11:09:02.523Z",
      "updatedAt": "2022-11-18T11:09:02.523Z",
    }

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.findOne.restore();
      Cart.create.restore();
    });

    it("should add product to cart successfully", async () => {
      const req = {
        body: inputData,
        user: userData
      };

      const stubFind = stubFindOneProduct(foundData);
      const stubCreate = sinon.stub(Cart, "create").resolves(stubData);

      await addToCartCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Product added to cart successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });

  });

  describe("NEGATIVE TEST", () => {
    const inputData = { ...cartData.bodyData.invalid };
    const userData = { ...cartData.userData.invalid };
    const foundData = cartData.foundData.invalid;

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

    it("should not add product to cart successfully when product is not found", async () => {
      const req = {
        body: inputData,
        user: userData
      };

      const stubFind = stubFindOneProduct(foundData);

      await addToCartCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Product does not exist");
    });
  });

});
