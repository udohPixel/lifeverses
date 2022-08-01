// import required modules
const apiResponse = require("../../common/ApiResponse");
const updateScriptureService = require("../services/updateScripture.service");

// update scripture controller
const updateScriptureCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { bibleTitle, bibleChapter } = req.body;

    // update scripture service
    const scripture = await updateScriptureService(
      req,
      bibleTitle,
      bibleChapter
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
