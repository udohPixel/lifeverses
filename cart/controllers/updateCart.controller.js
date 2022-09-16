// import required modules
const apiResponse = require("../../common/ApiResponse");
const updateCartService = require("../services/updateCart.service");

// update cart controller
const updateCartCtrl = async (req, res) => {
  try {
    let theUserId = req.user.id;
    let cartId = req.params.id;

    // update cart service
    const cart = await updateCartService(theUserId, cartId);

    return apiResponse.success(res, "Cart updated successfully", cart);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "update_cart");
  }
};

// export controller
module.exports = updateCartCtrl;
