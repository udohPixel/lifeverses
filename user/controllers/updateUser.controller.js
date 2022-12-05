// import required modules
const apiResponse = require("../../common/ApiResponse");
const updateUserService = require("../services/updateUser.service");

// update/save user controller
const updateUserCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const userInfo = ({
      firstname,
      lastname,
      gender,
      username,
      email,
      profilePic,
      careerField,
      role,
      bio,
      facebook,
      youtube,
      instagram,
      linkedIn,
      twitter,
    } = req.body);

    let userId = req.params.id;
    let currentUserId = req.user.id;

    // update user service
    const user = await updateUserService(userId, currentUserId, userInfo);

    return apiResponse.success(res, "User updated successfully", user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "update-user");
  }
};

// export controller
module.exports = updateUserCtrl;
