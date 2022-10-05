// import required modules
const chai = require("chai");
const server = require("../../app");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// get all situations test
describe("GET ALL SITUATIONS TEST", () => {
  describe("POSITIVE TEST", () => {
    it("should get all situations successfully", async () => {
      const response = await chai
        .request(server)
        .get("/api/situation/find/all");

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(200);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property(
        "message",
        "Situations found successfully"
      );
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");
    });
  });

  describe("NEGATIVE TEST", () => {
    it("should not get all situations successfully", async () => {
      const response = await chai.request(server).get("/api/situation/find/al");

      // console.log(response);
      expect(response).to.have.status(404);
    });
  });
});
