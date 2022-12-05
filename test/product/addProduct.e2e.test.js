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
const addProductCtrl = require("../../product/controllers/addProduct.controller");
const { stubFindOneProduct } = require("../helpers/helper.sinon");

// create product test
describe("CREATE PRODUCT E2E TEST", () => {
  describe("POSITIVE TEST", () => {
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

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.findOne.restore();
      Product.create.restore();
    });

    it("should create product successfully", async () => {
      const req = {
        body: { ...inputData },
        user: userData
      };

      const stubFind = stubFindOneProduct(foundData)
      const stubCreate = sinon.stub(Product, "create").resolves(stubData);

      await addProductCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Product added successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });

  });

  describe("NEGATIVE TEST", () => {
    const inputData = { ...productData.bodyData.valid.productInfo };
    const userData = { ...productData.userData.valid };
    const foundData = { ...productData.foundData.invalid };

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

    it("should not create product successfully when product is found with same title", async () => {
      const req = {
        body: { ...inputData },
        user: userData
      };

      const stubFind = stubFindOneProduct(foundData);

      await addProductCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Title has already been taken. Try another");
    });
  });

});
