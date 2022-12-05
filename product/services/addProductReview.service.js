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
  };

  let reviewerIds;
  // check if reviews array is empty
  if (!product.reviews == []) {
    // fetch reviewer ids
    reviewerIds = product.reviews.map((review) => {
      return review.reviewerId;
    });
  };

  // create new review
  if (product.reviews == [] || (!product.reviews == [] && !reviewerIds.includes(reviewerId))) {
    // add new review
    // new review object
    const reviewValues = {
      productId,
      reviewerId,
      reviewTitle,
      reviewRating,
      comment
    };

    await Product.findByIdAndUpdate(
      { _id: productId },
      { $push: { reviews: reviewValues } }
    );

    // update ratings and totalReviews
    let theTotalRatings = 0;
    product.reviews.forEach((review) => (theTotalRatings += review.reviewRating));
    let theRatings = (theTotalRatings + reviewRating) / product.totalReviews;

    const productValues = {
      totalReviews: product.reviews.length + 1,
      ratings: theRatings
    };

    let newProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: productValues },
      { new: true }
    );

    return newProduct;
  }

  // update existing review
  if (!product.reviews == [] && reviewerIds.includes(reviewerId)) {
    // update existing review
    const theReviewValues = {
      "reviews.$.reviewTitle": reviewTitle,
      "reviews.$.reviewRating": reviewRating,
      "reviews.$.comment": comment
    };

    await Product.updateOne(
      { _id: productId, "reviews.reviewerId": reviewerId },
      { $set: theReviewValues }
    );

    // update ratings
    // get index of review to be updated
    let indexOfReview = reviewerIds.indexOf(reviewerId);

    let totalRatings = 0;
    product.reviews.forEach((review) => (totalRatings += review.reviewRating));
    let oldRating = product.reviews[indexOfReview].reviewRating;
    let theRatings = (totalRatings + reviewRating - oldRating) / product.totalReviews;

    const productValues = {
      ratings: theRatings
    }

    let updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: productValues },
      { new: true }
    );

    return updatedProduct;
  }
};

// export service
module.exports = addProductReviewService;
