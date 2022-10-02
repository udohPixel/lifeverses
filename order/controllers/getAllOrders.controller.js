// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllOrdersService = require("../services/getAllOrders.service");

// get all orders controller
const getAllOrdersCtrl = async (req, res) => {
  try {
    let queryStr = req.query;

    // get all orders service
    const orders = await getAllOrdersService(queryStr);

    return apiResponse.success(res, "Orders found successfully", orders);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_all_orders");
  }
};

// export controller
module.exports = getAllOrdersCtrl;
