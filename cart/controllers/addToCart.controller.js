// import required modules
const apiResponse = require("../../common/ApiResponse");
const addCartService = require("../services/addToCart.service");

// add cart controller
const addToCartCtrl = async (req, res) => {
  try {
    // object destructuring assignment
    const { productId, quantity } = req.body;

    let userId = req.user.id;

    // add cart service
    const cart = await addCartService(userId, productId, quantity);

    return apiResponse.success(
      res,
      "Product added to cart successfully",
      cart,
      201
    );
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "add_cart");
  }
};

// export controller
module.exports = addToCartCtrl;
