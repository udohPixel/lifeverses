// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const favouriteData = require("./addToFavourite.data.mock.json");
const Scripture = require("../../scripture/models/Scripture");
const User = require("../../user/models/User");
const { removeFromFavourite } = require("../../user/services/addToFavourite.service");
const { stubFindOneScripture, stubByIdUpdateUser } = require("../helpers/helper.sinon");

// remove from favourite test
describe("REMOVE FROM FAVOURITE UNIT TEST", () => {
  const inputData = { ...favouriteData.bodyData.valid };
  const userData = { ...favouriteData.userData.valid };
  const foundData = { ...favouriteData.foundData.valid };
  const foundData1 = { ...favouriteData.foundData.valid1 };

  const stubData = [
    "638461fd5a145a04e704ca0b"
  ];

  afterEach(() => {
    Scripture.findOne.restore();
    User.findByIdAndUpdate.restore();
    User.findOne.restore();
  });

  it("should add scripture to favourite successfully", async () => {
    const stubFindScripture = stubFindOneScripture(foundData);
    const stubUpdate = stubByIdUpdateUser(stubData);
    const stubFind = sinon.stub(User, "findOne").resolves(foundData1);

    const response = await removeFromFavourite(userData.id, inputData.scriptureId);

    expect(stubFindScripture.calledOnce).to.be.true;
    expect(stubUpdate.calledOnce).to.be.true;
    expect(stubFind.calledOnce).to.be.true;
    const stubFindCallArg = stubFind.getCalls()[0].args[0];
    expect(stubFindCallArg).to.be.an('object');
    expect(stubFindCallArg._id).to.equal(userData.id);
    expect(response).to.be.an("array");
  });

});
