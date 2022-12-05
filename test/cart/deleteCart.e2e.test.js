// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const cartData = require("./deleteCart.data.mock.json");
const Cart = require("../../cart/models/Cart");
const deleteCartCtrl = require("../../cart/controllers/deleteCart.controller");
const { stubFindOneCart } = require("../helpers/helper.sinon");

// delete cart test
describe("DELETE CART E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const userData = { ...cartData.userData.valid };
    const paramsData = { ...cartData.paramsData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Cart.findOne.restore();
    });

    after(() => {
      Cart.findOneAndUpdate.restore();
      Cart.findOneAndRemove.restore();
    });

    it("should reduce a cart quantity successfully", async () => {
      const foundData = { ...cartData.foundData.valid2 };

      const stubData = {
        "id": foundData.id,
        "userId": foundData.userId,
        "productId": foundData.productId,
        "quantity": foundData.quantity - 1,
        "createdAt": foundData.createdAt,
        "updatedAt": "2022-11-23T12:01:22.727Z",
      }

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneCart(foundData);
      const stubDelete = sinon.stub(Cart, "findOneAndUpdate").resolves(stubData);

      await deleteCartCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Cart deleted successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });

    it("should delete a cart successfully", async () => {
      const foundData = { ...cartData.foundData.valid };

      const stubData = {
        "id": foundData.id,
        "userId": foundData.userId,
        "productId": foundData.productId,
        "quantity": foundData.quantity,
        "createdAt": foundData.createdAt,
        "updatedAt": "2022-11-23T12:01:22.727Z",
      }

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneCart(foundData);
      const stubDelete = sinon.stub(Cart, "findOneAndRemove").resolves(stubData);

      await deleteCartCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Cart deleted successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe("NEGATIVE TEST", () => {
    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Cart.findOne.restore();
    })

    it("should not delete a cart successfully when cart is not found by id", async () => {
      const userData = { ...cartData.userData.valid };
      const paramsData = { ...cartData.paramsData.invalid };
      const foundData = cartData.foundData.invalid;

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneCart(foundData);

      await deleteCartCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Cart does not exist");
    });

    it("should not delete a cart successfully when logged in user is not creator of cart", async () => {
      const userData = { ...cartData.userData.invalid };
      const paramsData = { ...cartData.paramsData.valid };
      const foundData = { ...cartData.foundData.valid };

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneCart(foundData);

      await deleteCartCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(401);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Unauthorised");
    });
  });

});
