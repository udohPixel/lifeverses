// import required modules
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import other libraries
const situationData = require("./addSituation.data.mock.json");
const Situation = require("../../situation/models/Situation");
const addSituationCtrl = require("../../situation/controllers/addSituation.controller");
const { titleToSlug } = require("../../common/helpers");

// add situation test
describe("ADD NEW SITUATION E2E TEST", () => {
  describe("POSITIVE TEST", () => {
    const inputData = { ...situationData.validData };
    inputData.title = Date.now() + "_" + inputData.title;

    const foundData = null;

    const stubData = {
      "id": "636b9d4e4f562bab327b1643",
      "title": inputData.title,
      "slug": titleToSlug(inputData.title),
      "colour": inputData.colour,
      "icon": inputData.icon,
      "createdAt": "2022-11-09T12:30:06.312Z",
      "updatedAt": "2022-11-09T12:30:06.312Z",
    }

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Situation.findOne.restore();
      Situation.create.restore();
    });

    it("should create a situation successfully", async () => {
      const req = {
        body: {
          "title": inputData.title,
          "colour": inputData.colour,
          "icon": inputData.icon,
        }
      };

      const foundDataExec = {
        exec: async () => { return foundData }
      };
      const stubFind = sinon.stub(Situation, "findOne").returns(foundDataExec);

      const stubCreate = sinon.stub(Situation, "create").returns(stubData);

      await addSituationCtrl(req, res);

      expect(stubFind.calledOnce).to.be.true;
      expect(stubCreate.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(true);
      expect(json.args[0][0].message).to.equal("Situation added successfully");
      expect(json.args[0][0].data).to.equal(stubData);
    });

  });

  describe("NEGATIVE TEST", () => {
    const inputData = { ...situationData.invalidData };

    const foundData = {
      "id": "636b9d4e4f562bab327b1643",
      "title": "Thank you God",
      "slug": "thank-you-god",
      "colour": "bg-green-1 color-green",
      "icon": "ri-love-and-thanks",
      "createdAt": "2022-11-09T12:30:06.312Z",
      "updatedAt": "2022-11-09T12:30:06.312Z",
    };

    let status, json, res;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(() => {
      Situation.findOne.restore();
    });

    it("should not create a situation successfully when title is not unique", async () => {
      const req = {
        body: {
          "title": inputData.title,
          "colour": inputData.colour,
          "icon": inputData.icon,
        }
      };

      const foundDataExec = {
        exec: async () => { return foundData }
      };
      const stubFind = sinon.stub(Situation, "findOne").returns(foundDataExec);

      await addSituationCtrl(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].success).to.equal(false);
      expect(json.args[0][0].message).to.equal("Situation already exist. Try another");
    });
  });

});
