// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./deleteProduct.data.mock.json");
const Product = require("../../product/models/Product");
const deleteProductService = require("../../product/services/deleteProduct.service");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// delete product test
describe("DELETE PRODUCT UNIT TEST", () => {
  const userData = { ...productData.userData.valid };
  const paramsData = { ...productData.paramsData.valid };
  const foundData = { ...productData.foundData.valid };

  afterEach(() => {
    Product.findOne.restore();
    Product.findOneAndRemove.restore();
  });

  it("should delete a product successfully", async () => {
    const stubData = {
      "id": "637b12ef750acd0e8b255118",
      "userId": "636b9a3d4f562bab327b163e",
      "format": "Physical Book",
      "title": foundData.title,
      "slug": "my-second-product-9733988210114",
      "aboutAuthor": foundData.aboutAuthor,
      "authors": foundData.authors,
      "pages": foundData.pages,
      "publicationDate": foundData.publicationDate,
      "isbn": foundData.isbn,
      "category": foundData.category,
      "overview": foundData.overview,
      "description": foundData.description,
      "price": foundData.price,
      "discount": foundData.discount,
      "ratings": 0,
      "coverPic": foundData.coverPic,
      "previewPages": foundData.previewPages,
      "stock": foundData.stock,
      "isActive": false,
      "totalReviews": 0,
      "reviews": [],
      "createdAt": "2022-11-21T05:55:59.081Z",
      "updatedAt": "2022-11-21T05:55:59.081Z"
    };

    const stubFind = stubFindOneProduct(foundData);
    const stubDelete = sinon.stub(Product, "findOneAndRemove").resolves(stubData);

    const response = await deleteProductService(userData.role, userData.id, paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubDelete.calledOnce).to.be.true;
    const stubDeleteCallArg = stubDelete.getCalls()[0].args[0];
    expect(stubDeleteCallArg).to.be.an('object');
    expect(stubDeleteCallArg._id).to.equal(paramsData.id);
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
