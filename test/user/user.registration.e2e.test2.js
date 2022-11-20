// import required modules
const chai = require("chai");
const server = require("../../app");
const chaiHttp = require("chai-http");

// assertions
const expect = chai.expect;

// use chai http
chai.use(chaiHttp);

// import registration mock data
const regData = require("./registration.data.mock.json");

// user registration service test
describe("USER REGISTRATION SERVICE TEST", () => {
  describe("POSITIVE TEST", () => {
    it("should create a user account successfully", async () => {
      const data = { ...regData.validData };

      // check for uniqueness of email and username
      data.username = Date.now() + "_" + data.username;
      data.email = Date.now() + "_" + data.email;

      const response = await chai
        .request(server)
        .post("/api/auth/register")
        .send(data);

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(201);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", true);
      expect(response.body).to.have.property(
        "message",
        "Registration successful"
      );
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("object");
      expect(response.body.data).to.have.property("firstname", "John");
      expect(response.body.data).to.have.property("lastname", "Doe");
      expect(response.body.data).to.have.property("gender", "Male");
      expect(response.body.data).to.have.property("username", data.username);
      expect(response.body.data).to.have.property("email", data.email);
      expect(response.body.data.password).to.have.length(60);
      expect(response.body.data).to.have.property(
        "careerField",
        "Education and Training"
      );
    });
  });

  describe("NEGATIVE TEST", () => {
    it("should return false when another user exists with same email", async () => {
      const data = { ...regData.invalidEmailData };

      // check for uniqueness of username
      data.username = Date.now() + "_" + data.username;

      const response = await chai
        .request(server)
        .post("/api/auth/register")
        .send(data);

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(400);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", false);
      expect(response.body).to.have.property(
        "message",
        "Email has already been taken. Try another"
      );
    });

    it("should return false when another user exists with same username", async () => {
      const data = { ...regData.invalidUsernameData };

      // check for uniqueness of email
      data.email = Date.now() + "_" + data.email;

      const response = await chai
        .request(server)
        .post("/api/auth/register")
        .send(data);

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(400);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", false);
      expect(response.body).to.have.property(
        "message",
        "Username has already been taken. Try another"
      );
    });

    it("should return false when password does not contain a minimum of eight characters, at least one letter, one number and one special character", async () => {
      const data = { ...regData.invalidPasswordData };

      const response = await chai
        .request(server)
        .post("/api/auth/register")
        .send(data);

      // console.log(response);
      expect(response).to.be.an("object");
      expect(response).to.have.status(500);
      expect(response).to.have.property("body");
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("success", false);
      expect(response.body)
        .to.have.property("message")
        .contains("fails to match the required pattern");
    });
  });
});
