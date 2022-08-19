// import required modules
const apiResponse = require("../../common/ApiResponse");
const updatePersonalUserService = require("../services/updatePersonalUser.service");

// update/save user controller
const updatePersonalUserCtrl = async (req, res) => {
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
    } = req.body);

    let userId = req.user.id;

    // update personal user service
    const user = await updatePersonalUserService(userId, userInfo);

    return apiResponse.success(res, "Profile updated successfully", user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "personal_user_update");
  }
};

// export controller
module.exports = updatePersonalUserCtrl;
