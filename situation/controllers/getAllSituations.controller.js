// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllSituationsService = require("../services/getAllSituations.service");

// get all situations controller
const getAllSituationsCtrl = async (_req, res) => {
  try {
    // get all situation service
    const situations = await getAllSituationsService();

    // check if situation is empty
    if (!situations.length) {
      return apiResponse.error(res, "No situation", situations);
    }

    return apiResponse.success(
      res,
      "Situations found successfully",
      situations
    );
  } catch (error) {
    return apiResponse.error.errorObject(
      res,
      error,
      null,
      "get_all_situations"
    );
  }
};

// export controller
module.exports = getAllSituationsCtrl;
