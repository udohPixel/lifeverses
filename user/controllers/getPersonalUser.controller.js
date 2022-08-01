// import required modules
const apiResponse = require("../../common/ApiResponse");
const getPersonalUserService = require("../services/getPersonalUser.service.");

// get personal user controller
const getPersonalUserCtrl = async (req, res) => {
  try {
    // get personal user service
    const user = await getPersonalUserService(req);

    return apiResponse.success(res, "User found successfully", user);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_personal_user");
  }
};

// export controller
module.exports = getPersonalUserCtrl;
