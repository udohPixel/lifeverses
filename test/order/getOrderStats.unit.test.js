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
const getOrderStatsService = require("../../order/services/getOrderStats.service");

// get order stats unit test
describe("GET ORDER STATISTICS UNIT TEST", () => {
  const foundData = orderData.foundData.valid;

  afterEach(() => {
    Order.aggregate.restore();
  });

  it("should get order stats successfully", async () => {
    const stubFind = sinon.stub(Order, "aggregate").resolves(foundData);

    const response = await getOrderStatsService();

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("array");
    expect(response).to.be.an("array").that.is.not.empty;
  });

});
