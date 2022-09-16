// import required modules
const apiResponse = require("../../common/ApiResponse");
const getScriptureBySlugService = require("../services/getScriptureBySlug.service");

// fetch scripture controller
const getScriptureBySlugCtrl = async (req, res) => {
  try {
    let situationSlug = req.params.situation_slug;
    let theSlug = req.params.slug;

    // get scripture service
    const scripture = await getScriptureBySlugService(situationSlug, theSlug);

    // use API: https://functional-pancreas.glitch.me//api/get_verse/:book/:chapter/:verse(s) in frontend
    return apiResponse.success(res, "Scripture found successfully", scripture);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_scripture_by_slug");
  }
};

// export controller
module.exports = getScriptureBySlugCtrl;
