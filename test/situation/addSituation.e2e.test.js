// import required modules
const chai = require("chai");
const server = require("../../app");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import situation and login mock data
const situationData = require("./addSituation.data.mock.json");
const loginData = require("../helpers/helper.login.data.mock.json");

// add situation test
describe("ADD NEW SITUATION TEST", () => {
  describe("POSITIVE TEST", () => {
    it("should create a situation successfully", async () => {
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
        .post("/api/situation")
        .set({
          Authorization: token,
        })
        .send(data);

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(201);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property(
        "message",
        "Situation added successfully"
      );
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("object");
      expect(response.body.data).to.have.property("title", data.title);
      expect(response.body.data).to.have.property(
        "colour",
        "bg-orange-1 color-orange"
      );
      expect(response.body.data).to.have.property("icon", "ri-face-3-love");
    });
  });

  describe("NEGATIVE TEST", () => {
    it("should not create situation successfully", async () => {
      const data = { ...situationData.invalidData };

      // log the user in and get auth token
      const adminData = { ...loginData.adminData };
      const loginResponse = await chai
        .request(server)
        .post("/api/auth/login")
        .send(adminData);
      const token = loginResponse.body.data;

      const response = await chai
        .request(server)
        .post("/api/situation")
        .set({
          Authorization: token,
        })
        .send(data);

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(400);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", false);
      expect(response.body).to.have.property(
        "message",
        "Situation already exist. Try another"
      );
    });
  });
});
