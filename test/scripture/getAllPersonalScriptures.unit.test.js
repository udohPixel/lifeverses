// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./getAllPersonalScriptures.data.mock.json");
const Scripture = require("../../scripture/models/Scripture");
const getAllPersonalScripturesService = require("../../scripture/services/getAllPersonalScriptures.service");
const { stubFindAllPersonalScriptures } = require("../helpers/helper.sinon");

// get all personal scripture unit test
describe("GET ALL PERSONAL SCRIPTURES UNIT TEST", () => {
  const queryData = { ...scriptureData.queryData.valid };
  const userData = { ...scriptureData.userData.valid };
  const foundData = { ...scriptureData.foundData.valid };

  afterEach(() => {
    Scripture.find.restore();
  });

  it("should get all personal scriptures successfully", async () => {
    const stubFind = stubFindAllPersonalScriptures(foundData);

    const response = await getAllPersonalScripturesService(userData.id, queryData);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
