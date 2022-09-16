// import required modules
const apiResponse = require("../../common/ApiResponse");

const {
  addProduct,
  updateProduct,
  addProductReview,
} = require("../validations/productValidatorSchema");

// is add product values validated controller
const isAddProductValidated = async (req, res, next) => {
  // validate user-imputed values
  const productValidator = await addProduct.validate(req.body);

  // check if user-imputed values had errors
  if (productValidator.error) {
    apiResponse.error(res, productValidator.error?.message);
  } else {
    next();
  }
};

// is update product values validated controller
const isUpdateProductValidated = async (req, res, next) => {
  // validate user-updated values
  const productValidator = await updateProduct.validate(req.body);

  // check if user-updated values had errors
  if (productValidator.error) {
    apiResponse.error(res, productValidator.error?.message);
  } else {
    next();
  }
};

// is add product review values validated controller
const isAddProductReviewValidated = async (req, res, next) => {
  // validate user-imputed values
  const productValidator = await addProductReview.validate(req.body);

  // check if user-imputed values had errors
  if (productValidator.error) {
    apiResponse.error(res, productValidator.error?.message);
  } else {
    next();
  }
};

// export is add product validated
module.exports = {
  isAddProductValidated,
  isUpdateProductValidated,
  isAddProductReviewValidated,
};
