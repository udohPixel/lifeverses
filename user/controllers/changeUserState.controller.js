// import require modules
const apiResponse = require("../../common/ApiResponse");
const changeUserStateService = require("../services/changeUserState.service");

// change user state controller
const changeUserStateCtrl = async (req, res) => {
  try {
    let userId = req.params.id;

    // change user state service
    const userState = await changeUserStateService(userId);

    return apiResponse.success(
      res,
      "User state changed successfully",
      userState
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "change_user_state");
  }
};

// export controller
module.exports = changeUserStateCtrl;
