// import required modules
const apiResponse = require("../../common/ApiResponse");
const updateSituationService = require("../services/updateSituation.service");

// update situation controller
const updateSituationCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { title, colour, icon } = req.body;

    // update situation service
    const situation = await updateSituationService(req, title, colour, icon);

    return apiResponse.success(
      res,
      "Situation updated successfully",
      situation
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "update_situation");
  }
};

// export controller
module.exports = updateSituationCtrl;
