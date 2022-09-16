// import required modules
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");

// add/update product review service
const deleteProductReviewService = async (productId, reviewId) => {
  // fetch product by id
  let product = await Product.findOne({ _id: productId }).exec();

  // check if product exists
  if (!product) {
    throw new ApplicationException("Product does not exist", 404);
  }

  // fetch reviewer ids
  let reviewIds = product.reviews.map((review) => {
    return review._id.toString();
  });

  // check if current reviewerId exists in reviewerIds
  // if yes, user review already exists: update existing review
  let isReviewed = reviewIds.includes(reviewId);

  if (!isReviewed) {
    throw new ApplicationException("Review does not exist", 404);
  }

  // remove review with specific index
  let indexOfReview = reviewIds.indexOf(reviewId);
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
