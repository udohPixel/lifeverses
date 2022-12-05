// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const cartData = require("./getAllCarts.data.mock.json");
const Cart = require("../../cart/models/Cart");
const getAllCartsService = require("../../cart/services/getAllCarts.service");
const { stubFindAllCarts } = require("../helpers/helper.sinon");

// get all carts unit test
describe("GET ALL CARTS UNIT TEST", () => {
  const foundData = { ...cartData.foundData.valid };

  afterEach(() => {
    Cart.find.restore();
  });

  it("should get all carts successfully", async () => {
    const stubFind = stubFindAllCarts(foundData);

    const response = await getAllCartsService();

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
