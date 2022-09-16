// import required modules
const apiResponse = require("../../common/ApiResponse");
const passwordResetService = require("../services/passwordReset.service");

// reset password controller
const passwordResetCtrl = async (req, res) => {
  try {
    // get all required params
    let token = req.params.token;

    let { password, confirmPassword } = req.body;

    // reset password service
    const thePassword = await passwordResetService(
      token,
      password,
      confirmPassword
    );

    return apiResponse.success(
      res,
      "Password was reset successfully",
      thePassword
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "reset-password");
  }
};

// export controller
module.exports = passwordResetCtrl;
