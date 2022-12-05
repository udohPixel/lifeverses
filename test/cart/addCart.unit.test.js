// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const cartData = require("./addCart.data.mock.json");
const Product = require("../../product/models/Product");
const Cart = require("../../cart/models/Cart");
const addToCartService = require("../../cart/services/addToCart.service");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// add product to cart test
describe("ADD PRODUCT TO CART UNIT TEST", () => {
  const inputData = { ...cartData.bodyData.valid };
  const userData = { ...cartData.userData.valid };
  const foundData = { ...cartData.foundData.valid };

  const stubData = {
    "id": "637767ce0bf8ba4efccd1aab",
    "userId": "636b9a3d4f562bab327b163e",
    "productId": inputData.productId,
    "quantity": inputData.quantity,
    "createdAt": "2022-11-18T12:59:48.727Z",
    "updatedAt": "2022-11-18T12:59:48.727Z",
  }

  afterEach(() => {
    Product.findOne.restore();
    Cart.create.restore();
  })

  it("should add product to cart successfully", async () => {
    const stubFind = stubFindOneProduct(foundData);
    const stubCreate = sinon.stub(Cart, "create").resolves(stubData);

    const response = await addToCartService(userData.id, inputData.productId, inputData.quantity);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.have.property("userId", stubData.userId);
    expect(response).to.have.property("productId", stubData.productId);
    expect(response).to.have.property("quantity", stubData.quantity);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });

});
