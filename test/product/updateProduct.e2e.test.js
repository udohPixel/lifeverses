// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./updateProduct.data.mock.json");
const Product = require("../../product/models/Product");
const updateProductCtrl = require("../../product/controllers/updateProduct.controller");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// update product test
describe("UPDATE PRODUCT E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const inputData = { ...productData.bodyData.valid.productInfo };
    const userData = { ...productData.userData.valid };
    const paramsData = { ...productData.paramsData.valid };
    const foundData = { ...productData.foundData.valid };

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

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.findOne.restore();
      Product.findOneAndUpdate.restore();
    });

    it("should update a product successfully", async () => {
      const req = {
        body: inputData,
        user: userData,
        params: paramsData
      };

      const stubFind = stubFindOneProduct(foundData);
      const stubUpdate = sinon.stub(Product, "findOneAndUpdate").resolves(stubData);

      const productInfo = { ...inputData };

      await updateProductCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Product updated successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });
  });

  describe("NEGATIVE TEST", () => {
    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.findOne.restore();
    })

    it("should not update a product successfully when product is not found by id", async () => {
      const inputData = { ...productData.bodyData.valid.productInfo };
      const userData = { ...productData.userData.valid };
      const paramsData = { ...productData.paramsData.invalid };
      const foundData = productData.foundData.invalid;

      const req = {
        body: inputData,
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneProduct(foundData);

      const productInfo = { ...inputData };

      await updateProductCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Product does not exist");
    });

    it("should not update a product successfully when logged in user is not creator of product", async () => {
      const inputData = { ...productData.bodyData.valid.productInfo };
      const userData = { ...productData.userData.invalid };
      const paramsData = { ...productData.paramsData.valid };
      const foundData = { ...productData.foundData.valid };

      const req = {
        body: inputData,
        user: userData,
        params: paramsData
      };

      const stubFind = stubFindOneProduct(foundData);

      const productInfo = { ...inputData };

      await updateProductCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(401);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Unauthorised");
    });
  });

});
