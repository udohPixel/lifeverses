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

  // get index of review to be deleted
  let indexOfReview = reviewIds.indexOf(reviewId);

  // check if review to be deleted exist
  if (indexOfReview < 0) {
    throw new ApplicationException("Review does not exist", 404);
  }

  // remove review with specific index
  product.reviews.splice(indexOfReview, 1);

  // update total reviews
  product.totalReviews = product.reviews.length;

  // update ratings
  let totalRatings = 0;
  product.reviews.forEach((review) => (totalRatings += review.reviewRating));
  product.ratings = totalRatings / product.totalReviews;

  // save review
  let newProduct = await product.save();

  return newProduct.reviews;
};

// export service
module.exports = deleteProductReviewService;
