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
const getAllSituationsCtrl = require("../../situation/controllers/getAllSituations.controller");

// get all situations test
describe("GET ALL SITUATIONS E2E TEST", () => {
  describe("POSITIVE TEST", () => {
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

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      _req = {},
        res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Situation.find.restore();
    });

    it("should get all situations successfully", async () => {
      const foundDataExec = {
        exec: () => { return foundData }
      };
      const stubFind = sinon.stub(Situation, "find").returns(foundDataExec);

      await getAllSituationsCtrl(_req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Situations found successfully");
      expect(json.args[0][0].data).to.equal(foundData);
    });
  });

});
