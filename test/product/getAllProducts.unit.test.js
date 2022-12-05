// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./getAllProducts.data.mock.json");
const Product = require("../../product/models/Product");
const getAllProductsService = require("../../product/services/getAllProducts.service");
const { stubFindAllProducts } = require("../helpers/helper.sinon");

// get all products unit test
describe("GET ALL PRODUCTS UNIT TEST", () => {
  const queryData = { ...productData.queryData.valid };
  const foundData = { ...productData.foundData.valid };

  afterEach(() => {
    Product.find.restore();
  });

  it("should get all products successfully", async () => {
    const stubFind = stubFindAllProducts(foundData);

    const response = await getAllProductsService(queryData);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
