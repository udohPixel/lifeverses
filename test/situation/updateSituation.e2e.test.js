// import required modules
const chai = require("chai");
const server = require("../../app");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import situation mock data
const situationData = require("./updateSituation.data.mock.json");
const loginData = require("../helpers/helper.login.data.mock.json");

// update situation test
describe("UPDATE SITUATION TEST", () => {
  describe("POSITIVE TEST", () => {
    it("should update the situation successfully", async () => {
      const data = { ...situationData.validData };

      // check for uniqueness of title
      data.title = Date.now() + "_" + data.title;

      // log the user in and get auth token
      const adminData = { ...loginData.adminData };
      const loginResponse = await chai
        .request(server)
        .post("/api/auth/login")
        .send(adminData);
      const token = loginResponse.body.data;

      const response = await chai
        .request(server)
        .put("/api/situation/633d4b7cd19361f7785760f4")
        .set({
          Authorization: token,
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
});
