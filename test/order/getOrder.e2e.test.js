// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const orderData = require("./getOrder.data.mock.json");
const Order = require("../../order/models/Order");
const getOrderCtrl = require("../../order/controllers/getOrder.controller");
const { stubFindOneOrder } = require("../helpers/helper.sinon");

// get order test
describe("GET ORDER E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const userData = { ...orderData.userData.valid };
    const paramsData = { ...orderData.paramsData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Order.findOne.restore();
    });

    it("should get a order successfully", async () => {
      const foundData = { ...orderData.foundData.valid };

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneOrder(foundData);

      await getOrderCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Order found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
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
      Order.findOne.restore();
    })

    it("should not get a order successfully when order is not found by id", async () => {
      const userData = { ...orderData.userData.valid };
      const paramsData = { ...orderData.paramsData.invalid };
      const foundData = orderData.foundData.invalid;

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneOrder(foundData);

      await getOrderCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Order does not exist");
    });

    it("should not get a order successfully when logged in user is not creator of order", async () => {
      const userData = { ...orderData.userData.invalid };
      const paramsData = { ...orderData.paramsData.valid };
      const foundData = { ...orderData.foundData.valid };

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneOrder(foundData);

      await getOrderCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(401);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Unauthorised");
    });
  });

});
