// import required modules
const chai = require("chai");
const server = require("../../app");
const chaiHttp = require("chai-http");

// import login mock data
const loginData = require("./helper.login.data.mock.json");

// admin login
const testHelperService = {
  // get admin token
  adminToken: () => {
    // use chai http
    chai.use(chaiHttp);

    const data = { ...loginData.adminData };

    const response = chai.request(server).post("/api/auth/login").send(data);

    // console.log(response.body.data);

    return response;
  },
};

// export
module.exports = testHelperService;

// it("should log the user in successfully", async () => {

//   expect(response).to.be.an("object");
//   expect(response).to.have.status(200);
//   expect(response).to.have.property("body");
//   expect(response.body).to.be.an("object");
//   expect(response.body).to.have.property("success", true);
//   expect(response.body).to.have.property(
//     "message",
//     "Logged in successfully"
//   );
//   expect(response.body).to.have.property("data");
//   expect(response.body.data).to.be.a("string");
// });
