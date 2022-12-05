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
const addOrderCtrl = require("../../order/controllers/addOrder.controller");

// create order test
describe("CREATE ORDER E2E TEST", () => {
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
  }

  let status, json, res;

  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
  });

  afterEach(() => {
    Order.create.restore();
  });

  it("should create order successfully", async () => {
    const req = {
      body: inputData,
      user: userData
    };

    const stubCreate = sinon.stub(Order, "create").resolves(stubData);

    await addOrderCtrl(req, res);

    expect(stubCreate.calledOnce).to.be.true;
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(201);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].success).to.equal(true);
    expect(json.args[0][0].message).to.equal("Order created successfully");
    expect(json.args[0][0].data).to.equal(stubData);
  });

});
