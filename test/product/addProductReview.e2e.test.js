// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./addProductReview.data.mock.json");
const Product = require("../../product/models/Product");
const addProductReviewCtrl = require("../../product/controllers/addProductReview.controller");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// create product review test
describe("CREATE PRODUCT REVIEW E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const userData = { ...productData.userData.valid };
    const paramsData = { ...productData.paramsData.valid };
    const inputData = { ...productData.bodyData.valid };
    const foundData1 = productData.foundData.valid1;
    const foundData2 = { ...productData.foundData.valid2 };
    const foundData3 = { ...productData.foundData.valid3 };

    const stubData1 = {
      "id": foundData1.id,
      "userId": foundData1.userId,
      "format": foundData1.format,
      "title": foundData1.title,
      "slug": foundData1.slug,
      "aboutAuthor": foundData1.aboutAuthor,
      "authors": foundData1.authors,
      "pages": foundData1.pages,
      "publicationDate": foundData1.publicationDate,
      "isbn": foundData1.isbn,
      "category": foundData1.category,
      "overview": foundData1.overview,
      "description": foundData1.description,
      "price": foundData1.price,
      "discount": foundData1.discount,
      "ratings": 3,
      "coverPic": foundData1.coverPic,
      "previewPages": foundData1.previewPages,
      "stock": foundData1.stock,
      "isActive": foundData1.isActive,
      "totalReviews": 1,
      "reviews": [
        {
          "id": "637f3e6199954dc2d40f635f",
          "productId": "637b12ef750acd0e8b255118",
          "isActive": true,
          "reviewerId": "636b9a3d4f562bab327b163e",
          "reviewTitle": "Some sample new review",
          "reviewRating": 3,
          "comment": "This is a sample user comment for the new review."
        }
      ],
      "createdAt": foundData1.createdAt,
      "updatedAt": foundData1.updatedAt
    };

    const stubData2 = {
      "id": foundData2.id,
      "userId": foundData2.userId,
      "format": foundData2.format,
      "title": foundData2.title,
      "slug": foundData2.slug,
      "aboutAuthor": foundData2.aboutAuthor,
      "authors": foundData2.authors,
      "pages": foundData2.pages,
      "publicationDate": foundData2.publicationDate,
      "isbn": foundData2.isbn,
      "category": foundData2.category,
      "overview": foundData2.overview,
      "description": foundData2.description,
      "price": foundData2.price,
      "discount": foundData2.discount,
      "ratings": 4,
      "coverPic": foundData2.coverPic,
      "previewPages": foundData2.previewPages,
      "stock": foundData2.stock,
      "isActive": foundData2.isActive,
      "totalReviews": 3,
      "reviews": [
        {
          "id": "637f3e6199954dc2d40f635f",
          "productId": "637b12ef750acd0e8b255118",
          "isActive": true,
          "reviewerId": "636b9a3d4f562bab327b163e",
          "reviewTitle": "Some sample new review",
          "reviewRating": 3,
          "comment": "This is a sample user comment for the new review."
        },
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
      "createdAt": foundData2.createdAt,
      "updatedAt": foundData2.updatedAt
    };

    const stubData3 = {
      "id": foundData3.id,
      "userId": foundData3.userId,
      "format": foundData3.format,
      "title": foundData3.title,
      "slug": foundData3.slug,
      "aboutAuthor": foundData3.aboutAuthor,
      "authors": foundData3.authors,
      "pages": foundData3.pages,
      "publicationDate": foundData3.publicationDate,
      "isbn": foundData3.isbn,
      "category": foundData3.category,
      "overview": foundData3.overview,
      "description": foundData3.description,
      "price": foundData3.price,
      "discount": foundData3.discount,
      "ratings": 3.6666666667,
      "coverPic": foundData3.coverPic,
      "previewPages": foundData3.previewPages,
      "stock": foundData3.stock,
      "isActive": foundData3.isActive,
      "totalReviews": 3,
      "reviews": [
        {
          "id": "637f3e6199954dc2d40f635f",
          "productId": "637b12ef750acd0e8b255118",
          "isActive": true,
          "reviewerId": "636b9a3d4f562bab327b163e",
          "reviewTitle": "Some sample updated review",
          "reviewRating": 2,
          "comment": "This is a sample user comment for the updated review."
        },
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
      "createdAt": foundData3.createdAt,
      "updatedAt": foundData3.updatedAt
    }

    let status, json, res;
    let stubberUpdate;

    beforeEach(() => {
      stubberUpdate = sinon.stub(Product, "findByIdAndUpdate");

      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.findOne.restore();
      Product.findOneAndUpdate.restore();
      Product.findByIdAndUpdate.restore();
    });

    after(() => {
      Product.updateOne.restore();
    });

    it("should push new product review into array successfully when product reviews array is empty", async () => {
      const req = {
        body: { ...inputData },
        user: userData,
        params: paramsData
      };

      const stubFind = stubFindOneProduct(foundData1);
      const stubPushUpdate = stubberUpdate.resolves();
      const stubUpdate = sinon.stub(Product, "findOneAndUpdate").resolves(stubData1);

      await addProductReviewCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubPushUpdate.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Review saved successfully");
      expect(json.args[0][0].data).to.equal(stubData1);
    });

    it("should push new product review into array successfully when product reviews is not empty and no review is created by the current user", async () => {
      const req = {
        body: { ...inputData },
        user: userData,
        params: paramsData
      };

      const stubFind = stubFindOneProduct(foundData2);
      const stubPushUpdate = stubberUpdate.resolves();
      const stubUpdate = sinon.stub(Product, "findOneAndUpdate").resolves(stubData2);

      await addProductReviewCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubPushUpdate.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Review saved successfully");
      expect(json.args[0][0].data).to.equal(stubData2);
    });

    it("should update product review successfully when product reviews array is not empty and a review was created by the current user", async () => {
      const req = {
        body: { ...inputData },
        user: userData,
        params: paramsData
      };

      const stubFind = stubFindOneProduct(foundData3);
      const stubUpdateOne = sinon.stub(Product, "updateOne").resolves();
      const stubUpdate = sinon.stub(Product, "findOneAndUpdate").resolves(stubData3);

      await addProductReviewCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubUpdateOne.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Review saved successfully");
      expect(json.args[0][0].data).to.equal(stubData3);
    });

  });

  describe("NEGATIVE TEST", () => {
    const userData = { ...productData.userData.valid };
    const paramsData = { ...productData.paramsData.invalid };
    const inputData = { ...productData.bodyData.valid };
    const foundData = productData.foundData.invalid;

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.findOne.restore();
    });

    it("should not update product review successfully when product is not found by id", async () => {
      const req = {
        body: { ...inputData },
        user: userData,
        params: paramsData
      };

      const stubFind = stubFindOneProduct(foundData);

      await addProductReviewCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Product does not exist");
    });
  });

});
