// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const cartData = require("./updateCart.data.mock.json");
const Cart = require("../../cart/models/Cart");
const updateCartService = require("../../cart/services/updateCart.service");
const { stubFindOneCart } = require("../helpers/helper.sinon");

// update cart test
describe("UPDATE CART UNIT TEST", () => {
  const userData = { ...cartData.userData.valid };
  const paramsData = { ...cartData.paramsData.valid };
  const foundData = { ...cartData.foundData.valid };

  const stubData = {
    "id": foundData.id,
    "userId": foundData.userId,
    "productId": foundData.productId,
    "quantity": foundData.quantity + 1,
    "createdAt": "2022-11-18T12:59:48.727Z",
    "updatedAt": "2022-11-23T12:01:22.727Z",
  }

  afterEach(() => {
    Cart.findOne.restore();
    Cart.findOneAndUpdate.restore();
  })

  it("should update cart successfully", async () => {
    const stubFind = stubFindOneCart(foundData);

    const stubUpdate = sinon.stub(Cart, "findOneAndUpdate").resolves(stubData);

    const response = await updateCartService(userData.id, paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.have.property("userId", stubData.userId);
    expect(response).to.have.property("productId", stubData.productId);
    expect(response).to.have.property("quantity", stubData.quantity);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });

});
