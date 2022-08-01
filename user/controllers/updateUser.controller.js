// import required modules
const apiResponse = require("../../common/ApiResponse");
const updateUserService = require("../services/updateUser.service");

// update/save user controller
const updateUserCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const {
      firstname,
      lastname,
      gender,
      username,
      email,
      profilePic,
      role,
      isActive,
      bio,
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter,
    } = req.body;

    // update user service
    const user = await updateUserService(
      req,
      firstname,
      lastname,
      gender,
      username,
      email,
      profilePic,
      role,
      isActive,
      bio,
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter
    );

    return apiResponse.success(res, "User updated successfully", user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "update_user");
  }
};

// export controller
module.exports = updateUserCtrl;
