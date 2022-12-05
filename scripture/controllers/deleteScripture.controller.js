// import required modules
const apiResponse = require("../../common/ApiResponse");
const deleteScriptureService = require("../services/deleteScripture.service");

// delete scripture controller
const deleteScriptureCtrl = async (req, res) => {
  try {
    // get other data
    let theRole = req.user.role;
    let theUserId = req.user.id;
    let theSituationId = req.params.situation_id;
    let scriptureId = req.params.scripture_id;

    // delete scripture service
    const scripture = await deleteScriptureService(
      theRole,
      theUserId,
      theSituationId,
      scriptureId
    );

    return apiResponse.success(
      res,
      "Scripture was deleted successfully",
      scripture
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "delete-scripture");
  }
};

// export controller
module.exports = deleteScriptureCtrl;
