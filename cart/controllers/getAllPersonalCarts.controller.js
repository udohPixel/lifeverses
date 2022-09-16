// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllPersonalCartsService = require("../services/getAllPersonalCarts.service");

// get all carts controller
const getAllPersonalCartsCtrl = async (req, res) => {
  try {
    let theUserId = req.user.id;

    // get all cart service
    const carts = await getAllPersonalCartsService(theUserId);

    return apiResponse.success(res, "Carts found successfully", carts);
  } catch (error) {
    return apiResponse.error.errorObject(res, error, null, "get_all_carts");
  }
};

// export controller
module.exports = getAllPersonalCartsCtrl;
