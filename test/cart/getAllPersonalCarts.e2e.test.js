// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const cartData = require("./getAllPersonalCarts.data.mock.json");
const Cart = require("../../cart/models/Cart");
const getAllPersonalCartsCtrl = require("../../cart/controllers/getAllPersonalCarts.controller");
const { stubFindAllCarts } = require("../helpers/helper.sinon");

// get all personal carts test
describe("GET ALL PERSONAL CARTS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const userData = { ...cartData.userData.valid };
    const foundData = { ...cartData.foundData.valid };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Cart.find.restore();
    });

    it("should get all personal carts successfully", async () => {
      const stubFind = stubFindAllCarts(foundData);

      const req = {
        user: userData,
      };

      await getAllPersonalCartsCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Carts found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

});
