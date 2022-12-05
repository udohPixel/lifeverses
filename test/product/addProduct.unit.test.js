// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./addProduct.data.mock.json");
const Product = require("../../product/models/Product");
const addProductService = require("../../product/services/addProduct.service");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// create product test
describe("CREATE PRODUCT UNIT TEST", () => {
  const inputData = { ...productData.bodyData.valid.productInfo };
  const userData = { ...productData.userData.valid };
  const foundData = productData.foundData.valid;

  const stubData = {
    "id": "637b12ef750acd0e8b255118",
    "userId": "636b9a3d4f562bab327b163e",
    "format": "Physical Book",
    "title": inputData.title,
    "slug": "my-second-product-9733988210114",
    "aboutAuthor": inputData.aboutAuthor,
    "authors": inputData.authors,
    "pages": inputData.pages,
    "publicationDate": inputData.publicationDate,
    "isbn": inputData.isbn,
    "category": inputData.category,
    "overview": inputData.overview,
    "description": inputData.description,
    "price": inputData.price,
    "discount": inputData.discount,
    "ratings": 0,
    "coverPic": inputData.coverPic,
    "previewPages": inputData.previewPages,
    "stock": inputData.stock,
    "isActive": false,
    "totalReviews": 0,
    "reviews": [],
    "createdAt": "2022-11-21T05:55:59.081Z",
    "updatedAt": "2022-11-21T05:55:59.081Z"
  }

  afterEach(() => {
    Product.findOne.restore();
    Product.create.restore();
  })

  it("should create product successfully", async () => {
    const stubFind = stubFindOneProduct(foundData);
    const stubCreate = sinon.stub(Product, "create").resolves(stubData);

    const productInfo = { ...inputData };

    const response = await addProductService(userData.id, productInfo);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubCreate.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.have.property("userId", stubData.userId);
    expect(response).to.have.property("title", stubData.title);
    expect(response).to.have.property("aboutAuthor", stubData.aboutAuthor);
    expect(response).to.have.property("authors", stubData.authors);
    expect(response).to.have.property("pages", stubData.pages);
    expect(response).to.have.property("publicationDate", stubData.publicationDate);
    expect(response).to.have.property("isbn", stubData.isbn);
    expect(response).to.have.property("category", stubData.category);
    expect(response).to.have.property("overview", stubData.overview);
    expect(response).to.have.property("description", stubData.description);
    expect(response).to.have.property("price", stubData.price);
    expect(response).to.have.property("discount", stubData.discount);
    expect(response).to.have.property("coverPic", stubData.coverPic);
    expect(response).to.have.property("previewPages", stubData.previewPages);
    expect(response).to.have.property("stock", stubData.stock);
    expect(response).to.have.property("createdAt", stubData.createdAt);
    expect(response).to.have.property("updatedAt", stubData.updatedAt);
  });

});
