// import required modules
const apiResponse = require("../../common/ApiResponse");
const addScriptureService = require("../services/addScripture.service");

// add new scripture controller
const addScriptureCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { bibleTitle, bibleChapter } = req.body;

    const scripture = await addScriptureService(req, bibleTitle, bibleChapter);

    return apiResponse.success(
      res,
      "Scripture added successfully",
      scripture,
      201
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "add_scripture");
  }
};

// export controller
module.exports = addScriptureCtrl;
