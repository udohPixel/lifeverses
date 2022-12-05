// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const cartData = require("./updateCart.data.mock.json");
const Cart = require("../../cart/models/Cart");
const updateCartCtrl = require("../../cart/controllers/updateCart.controller");
const { stubFindOneCart } = require("../helpers/helper.sinon");

// update cart test
describe("UPDATE CART E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const userData = { ...cartData.userData.valid };
    const paramsData = { ...cartData.paramsData.valid };
    const foundData = { ...cartData.foundData.valid };

    const stubData = {
      "id": foundData.id,
      "userId": foundData.userId,
      "productId": foundData.productId,
      "quantity": foundData.quantity + 1,
      "createdAt": foundData.quantity,
      "updatedAt": "2022-11-23T12:01:22.727Z",
    }

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Cart.findOne.restore();
      Cart.findOneAndUpdate.restore();
    });

    it("should update a cart successfully", async () => {
      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneCart(foundData);
      const stubUpdate = sinon.stub(Cart, "findOneAndUpdate").resolves(stubData);

      await updateCartCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Cart updated successfully");
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

    it("should not update a cart successfully when cart is not found by id", async () => {
      const userData = { ...cartData.userData.valid };
      const paramsData = { ...cartData.paramsData.invalid };
      const foundData = cartData.foundData.invalid;

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneCart(foundData);

      await updateCartCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Cart does not exist");
    });

    it("should not update a cart successfully when logged in user is not creator of cart", async () => {
      const userData = { ...cartData.userData.invalid };
      const paramsData = { ...cartData.paramsData.valid };
      const foundData = { ...cartData.foundData.valid };

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneCart(foundData);

      await updateCartCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(401);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Unauthorised");
    });
  });

});
