// import required modules
const chai = require("chai");
const server = require("../../app");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import situation and login mock data
const loginData = require("../helpers/helper.login.data.mock.json");

// delete situation by id test
describe("DELETE SITUATION BY ID TEST", () => {
  describe("NEGATIVE TEST", () => {
    it("should not delete situation by id successfully", async () => {
      // log the user in and get auth token
      const adminData = { ...loginData.adminData };
      const loginResponse = await chai
        .request(server)
        .post("/api/auth/login")
        .send(adminData);
      const token = loginResponse.body.data;

      const response = await chai
        .request(server)
        .delete("/api/situation/633db86f089c816efb899b59")
        .set({
          Authorization: token,
        });

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
