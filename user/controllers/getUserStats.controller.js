// import required modules
const apiResponse = require("../../common/ApiResponse");
const getUserStatsService = require("../services/getUserStats.service");

// get user statistics controller
const getUserStatsCtrl = async (res) => {
  try {
    // get user statistics service
    const stats = await getUserStatsService();

    return apiResponse.success(res, "Stats loaded successfully", stats);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get-user-stats");
  }
};

// export controller
module.exports = getUserStatsCtrl;
