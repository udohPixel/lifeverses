// import require modules
const apiResponse = require("../../common/ApiResponse");
const changeProductStateService = require("../services/changeProductState.service");

// change product state controller
const changeProductStateCtrl = async (req, res) => {
  try {
    let productId = req.params.id;

    // change product state service
    const productState = await changeProductStateService(productId);

    return apiResponse.success(
      res,
      "Product state changed successfully",
      productState
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "change_product_state");
  }
};

// export controller
module.exports = changeProductStateCtrl;
