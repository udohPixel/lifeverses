// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllScripturesService = require("../services/getAllScriptures.service");

// fetch all scriptures controller
const getAllScripturesCtrl = async (req, res) => {
  try {
    let queryStr = req.query;

    // get all scriptures service
    const scriptures = await getAllScripturesService(queryStr);

    return apiResponse.success(
      res,
      "Scriptures found successfully",
      scriptures
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_all_scriptures");
  }
};

// export controller
module.exports = getAllScripturesCtrl;
