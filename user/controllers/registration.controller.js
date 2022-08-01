// import required modules
const apiResponse = require("../../common/ApiResponse");
const registrationService = require("../services/registration.service");

// user registration controller
const registrationCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const {
      firstname,
      lastname,
      gender,
      username,
      email,
      password,
      profilePic,
    } = req.body;

    // registration service
    const user = await registrationService(
      firstname,
      lastname,
      gender,
      username,
      email,
      password,
      profilePic
    );

    return apiResponse.success(res, "Registration successful", user, 201);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "registration");
  }
};

// export registration controller
module.exports = registrationCtrl;
