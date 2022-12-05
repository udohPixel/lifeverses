// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllPersonalScripturesService = require("../services/getAllPersonalScriptures.service");

// fetch all scriptures controller
const getAllPersonalScripturesCtrl = async (req, res) => {
  try {
    let theUserId = req.user.id;
    let queryStr = req.query;

    // get all scriptures service
    const scriptures = await getAllPersonalScripturesService(
      theUserId,
      queryStr
    );

    return apiResponse.success(
      res,
      "Scriptures found successfully",
      scriptures
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get-all-personal-scriptures");
  }
};

// export controller
module.exports = getAllPersonalScripturesCtrl;
