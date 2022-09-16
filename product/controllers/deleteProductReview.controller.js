// import required modules
const apiResponse = require("../../common/ApiResponse");
const deleteProductReviewService = require("../services/deleteProductReview.service");

// delete product review controller
const deleteProductReviewCtrl = async (req, res) => {
  try {
    let reviewId = req.params.review_id.toString();
    let productId = req.params.id;

    // delete product review service
    const reviews = await deleteProductReviewService(productId, reviewId);

    return apiResponse.success(
      res,
      "Product review deleted successfully",
      reviews
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "delete-product-review");
  }
};

// export controller
module.exports = deleteProductReviewCtrl;
