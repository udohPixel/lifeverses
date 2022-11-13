// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllSituationsService = require("../services/getAllSituations.service");

// get all situations controller
const getAllSituationsCtrl = async (res) => {
  try {
    // get all situation service
    const situations = await getAllSituationsService();

    return apiResponse.success(res, "Situations found successfully", situations);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_all_situations");
  }
};

// export controller
module.exports = getAllSituationsCtrl;
