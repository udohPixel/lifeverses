// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const productData = require("./getAllPersonalProducts.data.mock.json");
const Product = require("../../product/models/Product");
const User = require("../../user/models/User");
const getAllPersonalProductsService = require("../../product/services/getAllPersonalProducts.service");
const { stubFindAllPersonalProducts, stubFindOneUser } = require("../helpers/helper.sinon");

// get all personal product unit test
describe("GET ALL PERSONAL PRODUCTS UNIT TEST", () => {
  const paramsData = { ...productData.paramsData.valid };
  const queryData = { ...productData.queryData.valid };
  const foundData = { ...productData.foundData.valid };

  const stubData = {
    "id": "636b9a3d4f562bab327b163e",
    "firstname": "Udoh",
    "lastname": "Ndem",
    "gender": "Male",
    "username": "ipixel",
    "email": "udohndem@gmail.com",
    "profilePic": "https://st4.depositphotos.com/3265223/21282/v/600/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg",
    "careerField": "Information Technology",
    "isActive": false,
    "favouriteScriptures": [],
    "createdAt": "2022-11-09T12:17:02.106Z",
    "updatedAt": "2022-11-09T12:17:02.106Z",
  }

  afterEach(() => {
    User.findOne.restore();
    Product.find.restore();
  });

  it("should get all personal products successfully", async () => {
    const stubFindUser = stubFindOneUser(stubData);
    const stubFind = stubFindAllPersonalProducts(foundData);

    const response = await getAllPersonalProductsService(paramsData.username, queryData);

    expect(stubFindUser.calledOnce).to.be.true;
    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
