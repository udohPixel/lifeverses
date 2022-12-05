// import require modules
const apiResponse = require("../../common/ApiResponse");
const changeProductReviewStateService = require("../services/changeProductReviewState.service");

// change product review state controller
const changeProductReviewStateCtrl = async (req, res) => {
  try {
    let productId = req.params.id;
    let reviewId = req.params.review_id;

    // change product review state service
    const productState = await changeProductReviewStateService(
      productId,
      reviewId
    );

    return apiResponse.success(
      res,
      "Product review state changed successfully",
      productState
    );
  } catch (error) {
    return apiResponse.errorObject(
      res,
      error,
      null,
      "change-product-review-state"
    );
  }
};

// export controller
module.exports = changeProductReviewStateCtrl;
