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
const deleteProductCtrl = require("../../product/controllers/deleteProduct.controller");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// delete product test
describe("DELETE PRODUCT E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const userData = { ...productData.userData.valid };
    const paramsData = { ...productData.paramsData.valid };
    const foundData = { ...productData.foundData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

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
      }

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneProduct(foundData);
      const stubDelete = sinon.stub(Product, "findOneAndRemove").resolves(stubData);

      await deleteProductCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubDelete.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Product deleted successfully");
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

    it("should not delete a product successfully when product is not found by id", async () => {
      const userData = { ...productData.userData.valid };
      const paramsData = { ...productData.paramsData.invalid };
      const foundData = productData.foundData.invalid;

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneProduct(foundData);

      await deleteProductCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Product does not exist");
    });

    it("should not delete a product successfully when logged in user is not creator of product", async () => {
      const userData = { ...productData.userData.invalid };
      const paramsData = { ...productData.paramsData.valid };
      const foundData = { ...productData.foundData.valid };

      const req = {
        user: userData,
        params: paramsData,
      };

      const stubFind = stubFindOneProduct(foundData);

      await deleteProductCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(401);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Unauthorised");
    });
  });

});
