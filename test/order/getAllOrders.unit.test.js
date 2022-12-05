// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const orderData = require("./getAllOrders.data.mock.json");
const Order = require("../../order/models/Order");
const getAllOrdersService = require("../../order/services/getAllOrders.service");
const { stubFindAllOrders } = require("../helpers/helper.sinon");

// get all order unit test
describe("GET ALL ORDERS UNIT TEST", () => {
  const queryData = { ...orderData.queryData.valid };
  const foundData = { ...orderData.foundData.valid };

  afterEach(() => {
    Order.find.restore();
  });

  it("should get all orders successfully", async () => {
    const stubFind = stubFindAllOrders(foundData);

    const response = await getAllOrdersService(queryData);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
