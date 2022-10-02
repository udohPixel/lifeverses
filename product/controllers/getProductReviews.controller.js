// import required modules
const apiResponse = require("../../common/ApiResponse");
const getProductReviewsService = require("../services/getProductReviews.service");

// get product reviews controller
const getProductReviewsCtrl = async (req, res) => {
  try {
    let productId = req.params.id;

    // get product reviews service
    const reviews = await getProductReviewsService(productId);

    return apiResponse.success(res, "Reviews found successfully", reviews);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "product-reviews");
  }
};

// export controller
module.exports = getProductReviewsCtrl;
