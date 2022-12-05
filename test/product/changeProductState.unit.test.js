// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./changeProductState.data.mock.json");
const Product = require("../../product/models/Product");
const changeProductStateService = require("../../product/services/changeProductState.service");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// change product state test
describe("CHANGE PRODUCT STATE UNIT TEST", () => {
  const paramsData = { ...productData.paramsData.valid };
  const foundData = { ...productData.foundData.valid };

  afterEach(() => {
    Product.findOne.restore();
    Product.updateOne.restore();
  });

  it("should change a product active state successfully", async () => {
    const stubData = {
      "id": foundData.id,
      "userId": foundData.userId,
      "format": foundData.format,
      "title": foundData.title,
      "slug": foundData.slug,
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
      "ratings": foundData.discount.ratings,
      "coverPic": foundData.coverPic,
      "previewPages": foundData.previewPages,
      "stock": foundData.stock,
      "isActive": false,
      "totalReviews": foundData.totalReviews,
      "reviews": [
        {
          "id": "637e5d9fc457a382b43c79db",
          "productId": "637b12ef750acd0e8b255118",
          "isActive": true,
          "reviewerId": "888888888888888888a88888",
          "reviewTitle": "Some sample first review",
          "reviewRating": 5,
          "comment": "This is a sample user comment for the first review."
        },
        {
          "id": "637f3e2099954dc2d40f635b",
          "productId": "637b12ef750acd0e8b255118",
          "isActive": true,
          "reviewerId": "99999999999999999999999b",
          "reviewTitle": "Some sample second review",
          "reviewRating": 4,
          "comment": "This is a sample user comment for the second review."
        }
      ],
      "createdAt": foundData.createdAt,
      "updatedAt": foundData.updatedAt
    };

    const stubFind = stubFindOneProduct(foundData);
    const stubUpdate = sinon.stub(Product, "updateOne").resolves();

    const response = await changeProductStateService(paramsData.id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    const stubUpdateCallArg = stubUpdate.getCalls()[0].args[0];
    expect(stubUpdateCallArg).to.be.an('object');
    expect(stubUpdateCallArg._id).to.equal(paramsData.id);
    expect(response).to.be.an("boolean");
    expect(response).to.equal(stubData.isActive);
  });
});
