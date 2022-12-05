// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const scriptureData = require("./getAllScriptures.data.mock.json");
const Scripture = require("../../scripture/models/Scripture");
const getAllScripturesService = require("../../scripture/services/getAllScriptures.service");
const { stubFindAllScriptures } = require("../helpers/helper.sinon");

// get all scripture unit test
describe("GET ALL SCRIPTURES UNIT TEST", () => {
  const queryData = { ...scriptureData.queryData.valid };
  const foundData = { ...scriptureData.foundData.valid };

  afterEach(() => {
    Scripture.find.restore();
  });

  it("should get all scriptures successfully", async () => {
    const stubFind = stubFindAllScriptures(foundData);

    const response = await getAllScripturesService(queryData);

    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("object");
    expect(response).to.be.an("object").that.is.not.empty;
  });

});
