// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const orderData = require("./getOrder.data.mock.json");
const Order = require("../../order/models/Order");
const getOrderService = require("../../order/services/getOrder.service");
const { stubFindOneOrder } = require("../helpers/helper.sinon");

// get order test
describe("GET ORDER UNIT TEST", () => {
  const userData = { ...orderData.userData.valid };
  const paramsData = { ...orderData.paramsData.valid };
  const foundData = { ...orderData.foundData.valid };

  const stubData = {
    "id": foundData.id,
    "userId": foundData.userId,
    "shippingInfo": foundData.shippingInfo,
    "paymentInfo": foundData.paymentInfo,
    "orderProducts": foundData.orderProducts,
    "productsPrice": foundData.productsPrice,
    "shippingPrice": foundData.shippingPrice,
    "totalPrice": foundData.totalPrice,
    "orderStatus": foundData.orderStatus,
    "createdAt": foundData.createdAt,
    "updatedAt": foundData.updatedAt,
  }

  afterEach(() => {
    Order.findOne.restore();
  });

  it("should get a order successfully", async () => {
    const stubFind = stubFindOneOrder(foundData);

    const response = await getOrderService(userData.id, userData.role, paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    const stubFindCallArg = stubFind.getCalls()[0].args[0];
    expect(stubFindCallArg).to.be.an('object');
    expect(stubFindCallArg._id).to.equal(paramsData.id);
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", stubData.id);
    expect(response).to.have.property("userId", stubData.userId);
    expect(response).to.have.property("orderProducts", stubData.orderProducts);
    expect(response).to.have.property("productsPrice", stubData.productsPrice);
    expect(response).to.have.property("shippingPrice", stubData.shippingPrice);
    expect(response).to.have.property("totalPrice", stubData.totalPrice);
    expect(response).to.have.property("orderStatus", stubData.orderStatus);
    expect(response).to.have.property("shippingInfo", stubData.shippingInfo);
    expect(response).to.have.property("paymentInfo", stubData.paymentInfo);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });
});
