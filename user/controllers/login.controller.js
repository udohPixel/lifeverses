// import required modules
const apiResponse = require("../../common/ApiResponse");
const loginService = require("../services/login.service");

// user login controller
const loginCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { email, password } = req.body;

    // user login service
    const token = await loginService(email, password);

    return apiResponse.success(
      res,
      "Logged in successfully",
      "Bearer " + token
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "login");
  }
};

// export login controller
module.exports = loginCtrl;
