// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const orderData = require("./getAllPersonalOrders.data.mock.json");
const Order = require("../../order/models/Order");
const getAllPersonalOrdersService = require("../../order/services/getAllPersonalOrders.service");
const { stubFindAllPersonalOrders } = require("../helpers/helper.sinon");

// get all personal order unit test
describe("GET ALL PERSONAL ORDERS UNIT TEST", () => {
  const userData = { ...orderData.userData.valid };
  const queryData = { ...orderData.queryData.valid };
  const foundData = { ...orderData.foundData.valid };

  afterEach(() => {
    Order.find.restore();
  });

  it("should get all personal orders successfully", async () => {
    const stubFind = stubFindAllPersonalOrders(foundData);

    const response = await getAllPersonalOrdersService(userData.id, queryData);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
