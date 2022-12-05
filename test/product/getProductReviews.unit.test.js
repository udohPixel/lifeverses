// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./getProductReviews.data.mock.json");
const Product = require("../../product/models/Product");
const getProductReviewsService = require("../../product/services/getProductReviews.service");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// get product reviews test
describe("GET PRODUCT REVIEWS UNIT TEST", () => {
  const paramsData = { ...productData.paramsData.valid };
  const foundData = { ...productData.foundData.valid };

  afterEach(() => {
    Product.findOne.restore();
  });

  it("should get product reviews successfully", async () => {
    const stubFind = stubFindOneProduct(foundData);

    const response = await getProductReviewsService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    const stubFindCallArg = stubFind.getCalls()[0].args[0];
    expect(stubFindCallArg).to.be.an('object');
    expect(stubFindCallArg._id).to.equal(paramsData.id);
    expect(response).to.be.an("array");
  });

});
