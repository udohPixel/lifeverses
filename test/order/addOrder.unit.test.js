// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const orderData = require("./addOrder.data.mock.json");
const Order = require("../../order/models/Order");
const addOrderService = require("../../order/services/addOrder.service");

// create order test
describe("CREATE ORDER UNIT TEST", () => {
  const inputData = { ...orderData.bodyData.valid };
  const userData = { ...orderData.userData.valid };

  const stubData = {
    "id": "637a4894ef1eef4525f6600b",
    "userId": "636b9a3d4f562bab327b163e",
    "orderProducts": inputData.orderProducts,
    "productsPrice": 46250,
    "shippingPrice": inputData.shippingPrice,
    "totalPrice": 48250,
    "orderStatus": "Pending",
    "shippingInfo": inputData.shippingInfo,
    "paymentInfo": inputData.paymentInfo,
    "createdAt": "2022-11-20T15:32:36.901Z",
    "updatedAt": "2022-11-20T15:32:36.901Z"
  };

  afterEach(() => {
    Order.create.restore();
  });

  it("should create order successfully", async () => {
    const stubCreate = sinon.stub(Order, "create").resolves(stubData);

    const response = await addOrderService(userData.id, inputData.orderProducts, inputData.shippingInfo, inputData.paymentInfo, inputData.shippingPrice);

    expect(stubCreate.calledOnce).to.be.true;
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
