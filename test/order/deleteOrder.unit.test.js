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
const deleteOrderService = require("../../order/services/deleteOrder.service");
const { stubFindOneOrder } = require("../helpers/helper.sinon");

// delete order test
describe("DELETE ORDER UNIT TEST", () => {
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

  afterEach(() => {
    Order.findOne.restore();
    Order.findOneAndRemove.restore();
  });

  it("should delete a order successfully", async () => {
    const stubFind = stubFindOneOrder(foundData);
    const stubDelete = sinon.stub(Order, "findOneAndRemove").resolves(stubData);

    const response = await deleteOrderService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(stubDeleteCallArg._id).to.equal(paramsData.id);
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
