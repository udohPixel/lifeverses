// import required modules
const apiResponse = require("../../common/ApiResponse");
const deleteCartService = require("../services/deleteCart.service");

// delete cart controller
const deleteCartCtrl = async (req, res) => {
  try {
    let theUserId = req.user.id;
    let cartId = req.params.id;

    // delete cart service
    const cart = await deleteCartService(theUserId, cartId);

    return apiResponse.success(res, "Cart deleted successfully", cart);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "delete_cart");
  }
};

// export controller
module.exports = deleteCartCtrl;
