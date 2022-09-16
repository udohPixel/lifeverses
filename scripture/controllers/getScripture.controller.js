// import required modules
const apiResponse = require("../../common/ApiResponse");
const getScriptureService = require("../services/getScripture.service");

// fetch scripture controller
const getScriptureCtrl = async (req, res) => {
  try {
    let scriptureId = req.params.id;

    // get scripture service
    const scripture = await getScriptureService(scriptureId);

    // use API: https://functional-pancreas.glitch.me//api/get_verse/:book/:chapter/:verse(s) in frontend
    return apiResponse.success(res, "Scripture found successfully", scripture);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_scripture");
  }
};

// export controller
module.exports = getScriptureCtrl;
