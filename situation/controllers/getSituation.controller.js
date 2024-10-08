// import required modules
const apiResponse = require("../../common/ApiResponse");
const getSituationService = require("../services/getSituation.service");

// get situation controller
const getSituationCtrl = async (req, res) => {
  try {
    let situationId = req.params.id;

    // get situation service
    const situation = await getSituationService(situationId);

    return apiResponse.success(res, "Situation found successfully", situation);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_situation");
  }
};

// export controller
module.exports = getSituationCtrl;
