// import required modules
const apiResponse = require("../../common/ApiResponse");
const updateScriptureService = require("../services/updateScripture.service");

// update scripture controller
const updateScriptureCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { bibleTitle, bibleChapter } = req.body;

    // get other data
    let theRole = req.user.role;
    let theUserId = req.user.id;
    let theSituationId = req.params.situation_id;
    let scriptureId = req.params.scripture_id;
    let bibleVerses = req.body.bibleVerses.split(",");

    // update scripture service
    const scripture = await updateScriptureService(
      theRole,
      theUserId,
      theSituationId,
      scriptureId,
      bibleTitle,
      bibleChapter,
      bibleVerses
    );

    return apiResponse.success(
      res,
      "Scripture updated successfully",
      scripture
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "update_scripture");
  }
};

// export controller
module.exports = updateScriptureCtrl;
