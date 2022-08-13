// import require modules
const apiResponse = require("../../common/ApiResponse");
const changeProductStateService = require("../services/changeProductState.service");

// change item state controller
const changeItemStateCtrl = async (req, res) => {
  try {
    // change item state service
    const itemState = changeProductStateService(req);

    return apiResponse.success(
      res,
      "Product state changed successfully",
      itemState
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "change_item_state");
  }
};

// export controller
module.exports = changeItemStateCtrl;
