// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./deleteProductReview.data.mock.json");
const Product = require("../../product/models/Product");
const deleteProductReviewService = require("../../product/services/deleteProductReview.service");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// delete product review test
describe("DELETE PRODUCT REVIEW UNIT TEST", () => {
  const paramsData = { ...productData.paramsData.valid };
  const foundData = { ...productData.foundData.valid };

  afterEach(() => {
    Product.findOne.restore();
    Product.findOneAndUpdate.restore();
    Product.findByIdAndUpdate.restore();
  });

  it("should delete a product review from array, and update ratings and totalReviews successfully", async () => {
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
      "ratings": 4.5,
      "coverPic": foundData.coverPic,
      "previewPages": foundData.previewPages,
      "stock": foundData.stock,
      "isActive": foundData.isActive,
      "totalReviews": 2,
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
    const stubUpdate = sinon.stub(Product, "findOneAndUpdate").resolves();
    const stubPullDelete = sinon.stub(Product, "findByIdAndUpdate").resolves(stubData);

    const response = await deleteProductReviewService(paramsData.id, paramsData.review_id);

    expect(stubFind.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(stubPullDelete.calledOnce).to.be.true;
    const stubPullDeleteCallArg = stubPullDelete.getCalls()[0].args[0];
    expect(stubPullDeleteCallArg).to.be.an('object');
    expect(stubPullDeleteCallArg._id).to.equal(paramsData.id);
    expect(response).to.be.an("object");
    expect(response).to.have.property("id", stubData.id);
    expect(response).to.have.property("userId", stubData.userId);
    expect(response).to.have.property("ratings", stubData.ratings);
    expect(response).to.have.property("totalReviews", stubData.totalReviews);
    expect(response.reviews).to.be.an("array");
    expect(response.reviews).to.be.an("array").not.to.be.empty;
  });
});
