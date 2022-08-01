// import required modules
const apiResponse = require("../../common/ApiResponse");
const deleteScriptureService = require("../services/deleteScripture.service");

// delete scripture controller
const deleteScriptureCtrl = async (req, res) => {
  try {
    // delete scripture service
    const scripture = await deleteScriptureService(req);

    return apiResponse.success(
      res,
      "Scripture was deleted successfully",
      scripture
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "delete_scripture");
  }
};

// export controller
module.exports = deleteScriptureCtrl;
