// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const cartData = require("./deleteCart.data.mock.json");
const Cart = require("../../cart/models/Cart");
const deleteCartService = require("../../cart/services/deleteCart.service");
const { stubFindOneCart } = require("../helpers/helper.sinon");

// delete cart test
describe("DELETE CART UNIT TEST", () => {
  const userData = { ...cartData.userData.valid };
  const paramsData = { ...cartData.paramsData.valid };

  afterEach(() => {
    Cart.findOne.restore();
  });

  after(() => {
    Cart.findOneAndUpdate.restore();
    Cart.findOneAndRemove.restore();
  });

  it("should reduce a cart quantity successfully", async () => {
    const foundData = { ...cartData.foundData.valid2 };

    const stubData = {
      "id": foundData.id,
      "userId": foundData.userId,
      "productId": foundData.productId,
      "quantity": foundData.quantity - 1,
      "createdAt": foundData.createdAt,
      "updatedAt": "2022-11-23T12:01:22.727Z",
    }

    const stubFind = stubFindOneCart(foundData);
    const stubDelete = sinon.stub(Cart, "findOneAndUpdate").resolves(stubData);

    const response = await deleteCartService(userData.id, paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(stubDeleteCallArg._id).to.equal(paramsData.id);
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", stubData.id);
    expect(response).to.have.property("userId", stubData.userId);
    expect(response).to.have.property("productId", stubData.productId);
    expect(response).to.have.property("quantity", stubData.quantity);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });

  it("should delete a cart successfully", async () => {
    const foundData = { ...cartData.foundData.valid };

    const stubData = {
      "id": foundData.id,
      "userId": foundData.userId,
      "productId": foundData.productId,
      "quantity": foundData.quantity,
      "createdAt": foundData.createdAt,
      "updatedAt": "2022-11-23T12:01:22.727Z",
    }

    const stubFind = stubFindOneCart(foundData);
    const stubDelete = sinon.stub(Cart, "findOneAndRemove").resolves(stubData);

    const response = await deleteCartService(userData.id, paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(stubDeleteCallArg._id).to.equal(paramsData.id);
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", stubData.id);
    expect(response).to.have.property("userId", stubData.userId);
    expect(response).to.have.property("productId", stubData.productId);
    expect(response).to.have.property("quantity", stubData.quantity);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });
});
