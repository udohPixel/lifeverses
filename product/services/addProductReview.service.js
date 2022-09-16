// import required modules
const Product = require("../models/Product");
const ApplicationException = require("../../common/ApplicationException");

// add/update product review service
const addProductReviewService = async (
  productId,
  reviewerId,
  reviewTitle,
  reviewRating,
  comment
) => {
  // fetch product by id
  let product = await Product.findOne({ _id: productId }).exec();

  // check if product exists
  if (!product) {
    throw new ApplicationException("Product does not exist", 404);
  }

  // fetch reviewer ids
  let reviewerIds = product.reviews.map((review) => {
    return review.reviewerId;
  });

  // check if current reviewerId exists in reviewerIds
  // if yes, user review already exists: update existing review
  let isReviewed = reviewerIds.includes(reviewerId);

  // new review object
  const reviewValues = {
    productId: product._id.toString(),
    reviewerId,
    reviewTitle,
    reviewRating: Number(reviewRating),
    comment,
  };

  let totalRatingsArray;

  if (isReviewed) {
    // get index of review to be updated
    let indexOfReview = reviewerIds.indexOf(reviewerId);

    // push updated review object into product reviews
    product.reviews[indexOfReview] = reviewValues;

    // update ratings
    let totalRatings = 0;
    product.reviews.forEach((review) => (totalRatings += review.reviewRating));
    product.ratings = totalRatings / product.totalReviews;

    // update existing review
    let updatedProduct = await product.save();

    return updatedProduct.reviews;
  }

  // push new review object into product reviews
  product.reviews.push(reviewValues);

  // update total reviews
  product.totalReviews = product.reviews.length;

  // update ratings
  let theTotalRatings = 0;
  product.reviews.forEach((review) => (theTotalRatings += review.reviewRating));
  product.ratings = theTotalRatings / product.totalReviews;

  // add new review
  let newProduct = await product.save();

  return newProduct.reviews;
};

// export service
module.exports = addProductReviewService;
