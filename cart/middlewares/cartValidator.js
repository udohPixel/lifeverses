// import required modules
const apiResponse = require("../../common/ApiResponse");

const { addToCart } = require("../validations/cartValidatorSchema");

// is add cart values validated controller
const isAddToCartValidated = async (req, res, next) => {
  // validate user-imputed values
  const cartValidator = await addToCart.validate(req.body);

  // check if user-imputed values had errors
  if (cartValidator.error) {
    apiResponse.error(res, cartValidator.error?.message);
  } else {
    next();
  }
};

// export is add to cart validated
module.exports = {
  isAddToCartValidated,
};
