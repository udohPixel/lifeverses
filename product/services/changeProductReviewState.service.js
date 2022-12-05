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

  // check if review whose state is to be changed exist
  if (!reviewIds.includes(reviewId)) {
    throw new ApplicationException("Review does not exist", 404);
  };

  // get index of review whose state is to be changed
  let indexOfReview = reviewIds.indexOf(reviewId);

  // toggle review state
  let theIsActive = (product.reviews[indexOfReview].isActive =
    !product.reviews[indexOfReview].isActive);

  let theReviewerId = product.reviews[indexOfReview].reviewerId;

  const theReviewValues = {
    "reviews.$.isActive": theIsActive
  };

  await Product.updateOne(
    { _id: productId, "reviews.reviewerId": theReviewerId },
    { $set: theReviewValues }
  );

  return product.reviews[indexOfReview].isActive;
};

// export service
module.exports = changeProductReviewStateService;
