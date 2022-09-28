// import required modules
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");

// change product review state service
const changeProductReviewStateService = async (productId, reviewId) => {
  // fetch product by id
  let product = await Product.findOne({ _id: productId }).exec();

  // check if product exists
  if (!product) {
    throw new ApplicationException("Product does not exist", 404);
  }

  // fetch review ids
  let reviewIds = product.reviews.map((review) => {
    return review.id;
  });

  // get index of review whose state is to be changed
  let indexOfReview = reviewIds.indexOf(reviewId);

  // check if review whose state is to be changed exist
  if (indexOfReview < 0) {
    throw new ApplicationException(
      "Review does not exist in this product",
      404
    );
  }

  // toggle review state
  product.reviews[indexOfReview].isActive =
    !product.reviews[indexOfReview].isActive;

  await product.save();

  return product.reviews[indexOfReview].isActive;
};

// export service
module.exports = changeProductReviewStateService;
