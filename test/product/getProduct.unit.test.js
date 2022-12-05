// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./getProduct.data.mock.json");
const Product = require("../../product/models/Product");
const getProductService = require("../../product/services/getProduct.service");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// get product by id test
describe("GET PRODUCT BY ID UNIT TEST", () => {
  const paramsData = { ...productData.paramsData.valid };
  const foundData = { ...productData.foundData.valid };

  afterEach(() => {
    Product.findOne.restore();
  });

  it("should get product by id successfully", async () => {
    const stubFind = stubFindOneProduct(foundData);

    const response = await getProductService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    const stubFindCallArg = stubFind.getCalls()[0].args[0];
    expect(stubFindCallArg).to.be.an('object');
    expect(stubFindCallArg._id).to.equal(paramsData.id);
    expect(response).to.be.an("object");
    expect(response).to.have.property("userId", foundData.userId);
    expect(response).to.have.property("title", foundData.title);
    expect(response).to.have.property("aboutAuthor", foundData.aboutAuthor);
    expect(response).to.have.property("authors", foundData.authors);
    expect(response).to.have.property("pages", foundData.pages);
    expect(response).to.have.property("publicationDate", foundData.publicationDate);
    expect(response).to.have.property("isbn", foundData.isbn);
    expect(response).to.have.property("category", foundData.category);
    expect(response).to.have.property("overview", foundData.overview);
    expect(response).to.have.property("description", foundData.description);
    expect(response).to.have.property("price", foundData.price);
    expect(response).to.have.property("discount", foundData.discount);
    expect(response).to.have.property("coverPic", foundData.coverPic);
    expect(response).to.have.property("previewPages", foundData.previewPages);
    expect(response).to.have.property("stock", foundData.stock);
    expect(response).to.have.property("createdAt", foundData.createdAt);
    expect(response).to.have.property("updatedAt", foundData.updatedAt);
  });

});
