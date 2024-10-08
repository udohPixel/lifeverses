// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllUsersService = require("../services/getAllUsers.service");

// get all users controller
const getAllUsersCtrl = async (req, res) => {
  try {
    let queryStr = req.query;

    // get all users service
    const users = await getAllUsersService(queryStr);

    return apiResponse.success(res, "Users found successfully", users);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_all_users");
  }
};

// export controller
module.exports = getAllUsersCtrl;
