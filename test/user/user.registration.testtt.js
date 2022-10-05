// import all required libraries
const chai = require("chai");
const User = require("../../user/models/User");
const sandbox = require("sinon").createSandbox();
const userRegService = require("../../user/services/registration.service");

// assertions
const expect = chai.expect;

// import registration data data
const regData = require("./registration.data.mock.json");

// describe is used for grouping
// user registration test
describe("USER REGISTRATION SERVICE TEST", () => {
  describe("POSITIVE TEST", () => {
    // mocking (cloning) database
    before(() => {
      const userFindStub = sandbox.stub(User, "findOne");
      const userCreateStub = sandbox.stub(User, "create");
    });

    it("should create a user account successfully", async (done) => {
      try {
        const data = { ...regData.validData };

        // check for uniqueness of email and username
        data.username = Date.now() + "_" + data.username;
        data.email = Date.now() + "_" + data.email;

        const result = await userRegService(data);

        done();

        expect(result).to.be.an("object");
      } catch (error) {
        console.log(error);

        done();
      }
    });
  });

  //   describe("NEGATIVE TEST", () => {});
});
