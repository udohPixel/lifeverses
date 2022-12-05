// import required modules
const apiResponse = require("../../common/ApiResponse");
const addProductReviewService = require("../services/addProductReview.service");

// add/update product review controller
const addProductReviewCtrl = async (req, res) => {
  try {
    let reviewerId = req.user.id;
    let productId = req.params.id;

    // object destructuring assignment
    const { reviewTitle, reviewRating, comment } = req.body;

    // add/update product review service
    const reviews = await addProductReviewService(
      productId,
      reviewerId,
      reviewTitle,
      Number(reviewRating),
      comment
    );

    return apiResponse.success(res, "Review saved successfully", reviews, 201);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "add-product-review");
  }
};

// export controller
module.exports = addProductReviewCtrl;
