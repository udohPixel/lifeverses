// import required modules
const apiResponse = require("../../common/ApiResponse");
const updatePersonalPasswordService = require("../services/updatePersonalPassword.service");

// update/save user password controller
const updatePersonalPasswordCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { oldPassword, password } = req.body;

    let userId = req.user.id;

    // update personal password service
    const thePassword = await updatePersonalPasswordService(
      userId,
      oldPassword,
      password
    );

    return apiResponse.success(
      res,
      "Password updated successfully",
      thePassword
    );
  } catch (error) {
    return apiResponse.errorObject(
      res,
      error,
      null,
      "personal_password_update"
    );
  }
};

// export controller
module.exports = updatePersonalPasswordCtrl;
