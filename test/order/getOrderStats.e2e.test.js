// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const orderData = require("./getOrderStats.data.mock.json");
const Order = require("../../order/models/Order");
const getOrderStatsCtrl = require("../../order/controllers/getOrderStats.controller");
const { stubFindOrderStats } = require("../helpers/helper.sinon");

// get order stats test
describe("GET ORDER STATISTICS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const foundData = orderData.foundData.valid;

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Order.aggregate.restore();
    });

    it("should get order stats successfully", async () => {
      const _req = {};

      const stubFind = sinon.stub(Order, "aggregate").resolves(foundData);

      await getOrderStatsCtrl(_req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Order statistics loaded successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

});
