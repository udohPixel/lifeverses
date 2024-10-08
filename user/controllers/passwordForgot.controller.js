// import required modules
const apiResponse = require("../../common/ApiResponse");
const passwordForgotService = require("../services/passwordForgot.service");

// forgot password controller
const passwordForgotCtrl = async (req, res) => {
  try {
    // get all required params
    let email = req.body.email;
    let protocol = req.protocol;
    let host = req.get("host");

    // forgot password service
    await passwordForgotService(email, protocol, host);

    return apiResponse.success(res, "Email sent to " + email + " successfully");
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "forgot-password");
  }
};

// export controller
module.exports = passwordForgotCtrl;
