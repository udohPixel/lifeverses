// import required modules
const apiResponse = require("../../common/ApiResponse");
const deleteSituationService = require("../services/deleteSituation.service");

// delete situation controller
const deleteSituationCtrl = async (req, res) => {
  try {
    // delete situation service
    const situation = await deleteSituationService(req);

    return apiResponse.success(
      res,
      "Situation deleted successfully",
      situation
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "delete_situation");
  }
};

// export controller
module.exports = deleteSituationCtrl;
