// import required modules
const apiResponse = require("../../common/ApiResponse");
const getOrderStatsService = require("../services/getOrderStats.service");

// get order statistics controller
const getOrderStatsCtrl = async (res) => {
  try {
    // get order statistics service
    const stats = await getOrderStatsService();

    return apiResponse.success(res, "Stats loaded successfully", stats);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get-order-stats");
  }
};

// export controller
module.exports = getOrderStatsCtrl;
