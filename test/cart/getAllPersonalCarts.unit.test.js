// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const cartData = require("./getAllPersonalCarts.data.mock.json");
const Cart = require("../../cart/models/Cart");
const getAllPersonalCartsService = require("../../cart/services/getAllPersonalCarts.service");
const { stubFindAllCarts } = require("../helpers/helper.sinon");

// get all personal cart unit test
describe("GET ALL PERSONAL CARTS UNIT TEST", () => {
  const userData = { ...cartData.userData.valid };
  const foundData = { ...cartData.foundData.valid };

  afterEach(() => {
    Cart.find.restore();
  });

  it("should get all personal carts successfully", async () => {
    const stubFind = stubFindAllCarts(foundData);

    const response = await getAllPersonalCartsService(userData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
