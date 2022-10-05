// import required modules
const chai = require("chai");
const server = require("../../app");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// get situation by slug test
describe("GET SITUATION BY SLUG TEST", () => {
  describe("POSITIVE TEST", () => {
    it("should get situation by slug successfully", async () => {
      const response = await chai
        .request(server)
        .get("/api/situation/1664960573753_satisfactory/situation");

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(200);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property(
        "message",
        "Situation found successfully"
      );
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("object");
      expect(response.body.data).to.have.property(
        "_id",
        "633d483daf9f7a7df23100be"
      );
      expect(response.body.data).to.have.property(
        "title",
        "1664960573753_Satisfactory"
      );
      expect(response.body.data).to.have.property(
        "slug",
        "1664960573753_satisfactory"
      );
      expect(response.body.data).to.have.property(
        "colour",
        "bg-orange-1 color-orange"
      );
      expect(response.body.data).to.have.property("icon", "ri-face-3-love");
    });
  });

  describe("NEGATIVE TEST", () => {
    it("should not get situation by slug successfully", async () => {
      const response = await chai
        .request(server)
        .get("/api/situation/1664960573753_satisfacto/situation");

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
