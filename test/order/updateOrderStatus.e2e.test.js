// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const orderStatusData = require("./updateOrderStatus.data.mock.json");
const Order = require("../../order/models/Order");
const updateOrderStatusCtrl = require("../../order/controllers/updateOrderStatus.controller");
const { stubFindOneOrder, stubUpdateProduct } = require("../helpers/helper.sinon");
const Product = require("../../product/models/Product");

// update order status test
describe("UPDATE ORDER STATUS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const inputData = { ...orderStatusData.bodyData.valid };
    const paramsData = { ...orderStatusData.paramsData.valid };
    const foundData = { ...orderStatusData.foundData.valid };

    const stubProdData = [
      {
        "id": "637a4859ef1eef4525f66008",
        "userId": "636b9a3d4f562bab327b163e",
        "format": "Physical Book",
        "title": "My First Product",
        "slug": "my-first-product-9211007789922",
        "aboutAuthor": "This is a little text about me. Thank you for your time",
        "authors": "Udoh Ndem",
        "pages": 105,
        "publicationDate": "2017-03-15T14:34:00.000Z",
        "isbn": "9211007789922",
        "category": "Young Adult",
        "overview": "This is a short overview of the book in question. Thank you oh",
        "description": "Some oh description of the product in question. This would aid the user get more information about the product he/she wants to purchase. In this case, the book he/she wants to purchase. Thus, he/she has three (3) option to go about purchasing the product. \n(1) Add to cart, and procees with other purchase.\n(2) Add to wishlist, to purchase later.\n(3) The user can also ourightly \"Buy\" the product at that moment by clicking the \"Buy Now\" button.",
        "price": 5550,
        "discount": 500,
        "ratings": 0,
        "coverPic": "first-coverphoto-url.jpg",
        "previewPages": "first-previewphoto-url.pdf",
        "stock": 153,
        "isActive": false,
        "totalReviews": 0,
        "reviews": [],
        "createdAt": "2022-11-20T15:31:37.354Z",
        "updatedAt": "2022-11-20T15:31:37.354Z"
      },
      {
        "id": "637b12ef750acd0e8b255118",
        "userId": "636b9a3d4f562bab327b163e",
        "format": "Physical Book",
        "title": "My Second Product",
        "slug": "my-second-product-9733988210114",
        "aboutAuthor": "This is a little text about me. Thank you for your time. Yeah!",
        "authors": "Udoh Ndem",
        "pages": 200,
        "publicationDate": "2020-01-24T11:00:00.000Z",
        "isbn": "9733988210114",
        "category": "Young Adult",
        "overview": "This is a short overview of the book i.e the second product. Thanks.",
        "description": "Some description of the second product. This would aid the user get more information about the product he/she wants to purchase. In this case, the book he/she wants to purchase. Thus, he/she has three (3) option to go about purchasing the product. \n(1) Add to cart, and procees with other purchase.\n(2) Add to wishlist, to purchase later.\n(3) The user can also ourightly \"Buy\" the product at that moment by clicking the \"Buy Now\" button.",
        "price": 12000,
        "discount": 1500,
        "ratings": 0,
        "coverPic": "second-coverphoto-url.jpg",
        "previewPages": "second-previewphoto-url.pdf",
        "stock": 83,
        "isActive": false,
        "totalReviews": 0,
        "reviews": [],
        "createdAt": "2022-11-21T05:55:59.081Z",
        "updatedAt": "2022-11-21T05:55:59.081Z"
      }
    ];

    const stubData = {
      "id": foundData.id,
      "userId": foundData.userId,
      "orderProducts": foundData.orderProducts,
      "productsPrice": foundData.productsPrice,
      "shippingPrice": foundData.shippingPrice,
      "totalPrice": foundData.totalPrice,
      "orderStatus": "Shipped",
      "shippingInfo": foundData.shippingInfo,
      "paymentInfo": foundData.paymentInfo,
      "createdAt": foundData.createdAt,
      "updatedAt": foundData.updatedAt,
      "shippedAt": Date.now()
    };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Product.findOneAndUpdate.restore();
    });

    after(() => {
      Order.findOne.restore();
      Order.findOneAndUpdate.restore();
    });

    it("should update order status successfully", async () => {
      const req = {
        body: inputData,
        params: paramsData
      };

      const stubFind = stubFindOneOrder(foundData);
      const stubProdUpdate = stubUpdateProduct(stubProdData);
      const stubUpdate = sinon.stub(Order, "findOneAndUpdate").resolves(stubData);

      await updateOrderStatusCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubProdUpdate.calledTwice).to.be.true;
      expect(stubUpdate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Order updated successfully");
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
      Order.findOne.restore();
    })

    it("should not update a order successfully when order is not found by id", async () => {
      const inputData = { ...orderStatusData.bodyData.valid };
      const paramsData = { ...orderStatusData.paramsData.invalid };
      const foundDataNone = orderStatusData.foundData.invalid;

      const req = {
        body: inputData,
        params: paramsData
      };

      const stubFind = stubFindOneOrder(foundDataNone);

      await updateOrderStatusCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Order does not exist");
    });
  });

});
