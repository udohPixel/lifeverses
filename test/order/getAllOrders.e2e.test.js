// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const orderData = require("./getAllOrders.data.mock.json");
const Order = require("../../order/models/Order");
const getAllOrdersCtrl = require("../../order/controllers/getAllOrders.controller");
const { stubFindAllOrders } = require("../helpers/helper.sinon");

// get all orders test
describe("GET ALL ORDERS E2E TEST", () => {
  const queryData = { ...orderData.queryData.valid };
  const foundData = { ...orderData.foundData.valid };

  let status, json, res;

  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
  });

  afterEach(() => {
    Order.find.restore();
  });

  it("should get all orders successfully", async () => {
    const req = {
      query: queryData
    };

    const stubFind = stubFindAllOrders(foundData);

    await getAllOrdersCtrl(req, res);

    expect(stubFind.calledOnce).to.be.true;
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(200);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].success).to.equal(true);
    expect(json.args[0][0].message).to.equal("Orders found successfully");
    expect(json.args[0][0].data).to.equal(foundData);
  });

});
