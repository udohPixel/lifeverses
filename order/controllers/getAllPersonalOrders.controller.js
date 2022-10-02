// import required modules
const apiResponse = require("../../common/ApiResponse");
const getAllPersonalOrdersService = require("../services/getAllPersonalOrders.service");

// get all orders controller
const getAllPersonalOrdersCtrl = async (req, res) => {
  try {
    let theUserId = req.user.id;
    let queryStr = req.query;

    // get all orders service
    const orders = await getAllPersonalOrdersService(theUserId, queryStr);

    return apiResponse.success(res, "Orders found successfully", orders);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_all_orders");
  }
};

// export controller
module.exports = getAllPersonalOrdersCtrl;
