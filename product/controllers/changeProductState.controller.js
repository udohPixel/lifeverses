// import require modules
const apiResponse = require("../../common/ApiResponse");
const changeProductStateService = require("../services/changeProductState.service");

// change item state controller
const changeItemStateCtrl = async (req, res) => {
  try {
    let productId = req.params.id;

    // change item state service
    const productState = await changeProductStateService(productId);

    return apiResponse.success(
      res,
      "Product state changed successfully",
      productState
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "change_item_state");
  }
};

// export controller
module.exports = changeItemStateCtrl;
