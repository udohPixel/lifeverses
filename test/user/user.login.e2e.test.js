// import required modules
const chai = require("chai");
const server = require("../../app");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import login mock data
const loginData = require("./login.data.mock.json");

// user login service test
describe("USER LOGIN SERVICE TEST", () => {
  describe("POSITIVE TEST", () => {
    it("should log the user in successfully", async () => {
      const data = { ...loginData.validData };

      const response = await chai
        .request(server)
        .post("/api/auth/login")
        .send(data);

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(200);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property(
        "message",
        "Logged in successfully"
      );
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.a("string");
    });
  });

  describe("NEGATIVE TEST", () => {
    it("should not log the user in successfully", async () => {
      const data = { ...loginData.invalidData };

      const response = await chai
        .request(server)
        .post("/api/auth/login")
        .send(data);

      console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(400);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", false);
      expect(response.body).to.have.property(
        "message",
        "Invalid email or password"
      );
    });
  });
});
