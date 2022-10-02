// import required modules
const apiResponse = require("../../common/ApiResponse");
const getSituationBySlugService = require("../services/getSituationBySlug.service");

// get situation controller
const getSituationBySlugCtrl = async (req, res) => {
  try {
    let theSlug = req.params.slug;

    // get situation service
    const situation = await getSituationBySlugService(theSlug);

    return apiResponse.success(res, "Situation found successfully", situation);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_situation_by_slug");
  }
};

// export controller
module.exports = getSituationBySlugCtrl;
