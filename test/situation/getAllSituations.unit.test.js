// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const Situation = require("../../situation/models/Situation");
const getAllSituationsService = require("../../situation/services/getAllSituations.service");


// get all situation unit test
describe("GET ALL SITUATIONS UNIT TEST", () => {
  const foundData = [
    {
      "id": "636b9d4e4f562bab327b1643",
      "title": "Thank you God",
      "slug": "thank-you-god",
      "colour": "bg-green-1 color-green",
      "icon": "ri-love-and-thanks",
      "createdAt": "2022-11-09T12:30:06.312Z",
      "updatedAt": "2022-11-09T12:30:06.312Z",
    },
    {
      "id": "636b9fcb18029dcbc8e3335f",
      "title": "Joy",
      "slug": "joy",
      "colour": "bg-blue-1 color-blue",
      "icon": "ri-face-3-laughter",
      "createdAt": "2022-11-09T12:40:43.219Z",
      "updatedAt": "2022-11-09T12:54:51.412Z",
    },
    {
      "id": "636ba297670e217175bb2a76",
      "title": "Peace",
      "slug": "peace",
      "colour": "bg-orange-1 color-orange",
      "icon": "ri-face-3-love",
      "createdAt": "2022-11-09T12:52:39.508Z",
      "updatedAt": "2022-11-09T12:52:39.508Z",
    },
  ];

  afterEach(() => {
    Situation.find.restore();
  });

  it("should get all situations successfully", async () => {
    const stubFind = sinon.stub(Situation, "find").returns(foundData);

    const response = await getAllSituationsService();

    // console.log(response);
    expect(stubFind.calledOnce).to.be.true;
    expect(response).to.be.an("array");
    expect(response).to.be.an("array").that.is.not.empty;
  });

});
