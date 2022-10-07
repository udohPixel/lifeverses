// import required modules
const chai = require("chai");
const server = require("../../app");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import situation mock data and auth token data
const situationData = require("./updateSituation.data.mock.json");
const authToken = require("../helpers/helper.auth.token.mock.json");

// update situation test
describe("UPDATE SITUATION TEST", () => {
  describe("POSITIVE TEST", () => {
    it("should update the situation successfully", async () => {
      const data = { ...situationData.validData };

      // check for uniqueness of title
      data.title = Date.now() + "_" + data.title;

      const response = await chai
        .request(server)
        .put("/api/situation/633d4b7cd19361f7785760f4")
        .set({
          Authorization: authToken.token,
        })
        .send(data);

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(200);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property(
        "message",
        "Situation updated successfully"
      );
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("object");
      expect(response.body.data).to.have.property("title", data.title);
      expect(response.body.data).to.have.property(
        "colour",
        "bg-blue-1 color-blue"
      );
      expect(response.body.data).to.have.property("icon", "ri-face-3-laughter");
    });
  });

  describe("NEGATIVE TEST", () => {
    it("should not update the situation successfully", async () => {
      const data = { ...situationData.invalidData };

      // check for uniqueness of title
      data.title = Date.now() + "_" + data.title;

      const response = await chai
        .request(server)
        .put("/api/situation/999999999939999999999999")
        .set({
          Authorization: authToken.token,
        })
        .send(data);

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(404);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", false);
      expect(response.body).to.have.property(
        "message",
        "Situation does not exist"
      );
    });
  });
});
