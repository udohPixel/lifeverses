// import required modules
const apiResponse = require("../../common/ApiResponse");
const addSituationService = require("../services/addSituation.service");

// add situation controller
const addSituationCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { title, colour, icon } = req.body;

    // add situation service
    const situation = await addSituationService(title, colour, icon);

    return apiResponse.success(
      res,
      "Situation added successfully",
      situation,
      201
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "add_situation");
  }
};

// export controller
module.exports = addSituationCtrl;
