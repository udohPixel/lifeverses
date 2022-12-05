// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const orderData = require("./deleteOrder.data.mock.json");
const Order = require("../../order/models/Order");
const deleteOrderCtrl = require("../../order/controllers/deleteOrder.controller");
const { stubFindOneOrder } = require("../helpers/helper.sinon");

// delete order test
describe("DELETE ORDER E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const paramsData = { ...orderData.paramsData.valid };
    const foundData = { ...orderData.foundData.valid };

    const stubData = {
      "id": foundData.id,
      "userId": foundData.userId,
      "orderProducts": foundData.orderProducts,
      "productsPrice": foundData.productsPrice,
      "shippingPrice": foundData.shippingPrice,
      "totalPrice": foundData.totalPrice,
      "orderStatus": foundData.orderStatus,
      "shippingInfo": foundData.shippingInfo,
      "paymentInfo": foundData.paymentInfo,
      "createdAt": foundData.createdAt,
      "updatedAt": foundData.updatedAt,
    }

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Order.findOne.restore();
      Order.findOneAndRemove.restore();
    });

    it("should delete a order successfully", async () => {
      const req = {
        params: paramsData
      };

      const stubFind = stubFindOneOrder(foundData);
      const stubDelete = sinon.stub(Order, "findOneAndRemove").resolves(stubData);

      await deleteOrderCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Order deleted successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe("NEGATIVE TEST", () => {
    const paramsData = { ...orderData.paramsData.invalid };
    const foundData = orderData.foundData.invalid;

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Order.findOne.restore();
    })

    it("should not delete a order successfully when order is not found by id", async () => {
      const req = {
        params: paramsData,
      };

      const stubFind = stubFindOneOrder(foundData);

      await deleteOrderCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Order does not exist");
    });
  });

});
