// import required modules
const apiResponse = require("../../common/ApiResponse");
const updatePersonalUserService = require("../services/updatePersonalUser.service");

// update/save user controller
const updateUserPersonalCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const {
      firstname,
      lastname,
      gender,
      username,
      email,
      profilePic,
      bio,
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter,
    } = req.body;

    // update personal user service
    const user = await updatePersonalUserService(
      req,
      firstname,
      lastname,
      gender,
      username,
      email,
      profilePic,
      bio,
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter
    );

    return apiResponse.success(res, "Profile updated successfully", user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "personal_user_update");
  }
};

// export controller
module.exports = updateUserPersonalCtrl;
