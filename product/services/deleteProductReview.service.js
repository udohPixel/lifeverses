// import required modules
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");

// delete product review service
const deleteProductReviewService = async (productId, reviewId) => {
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

  // check if review to be deleted exist
  if (!reviewIds.includes(reviewId)) {
    throw new ApplicationException("Review does not exist", 404);
  };

  // get index of review to be deleted
  let indexOfReview = reviewIds.indexOf(reviewId);

  // get review rating with specific index
  let oldReviewRating = Number(product.reviews[indexOfReview].reviewRating);

  // update ratings and totalReviews
  let totalRatings = 0;
  product.reviews.forEach((review) => (totalRatings += review.reviewRating));
  let theRatings = (totalRatings - oldReviewRating) / (product.reviews.length - 1);

  const productValues = {
    totalReviews: product.reviews.length - 1,
    ratings: theRatings
  };

  await Product.findOneAndUpdate(
    { _id: productId },
    { $set: productValues },
    { new: true }
  );

  // delete review
  const theProduct = await Product.findByIdAndUpdate(
    { _id: productId },
    { $pull: { reviews: { _id: reviewId } } }
  );

  return theProduct;
};

// export service
module.exports = deleteProductReviewService;
