// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllCartsService = require("../services/getAllCarts.service");

// get all carts controller
const getAllCartsCtrl = async (_req, res) => {
  try {
    // get all cart service
    const carts = await getAllCartsService();

    return apiResponse.success(res, "Carts found successfully", carts);
  } catch (error) {
    return apiResponse.error.errorObject(res, error, null, "get_all_carts");
  }
};

// export controller
module.exports = getAllCartsCtrl;
