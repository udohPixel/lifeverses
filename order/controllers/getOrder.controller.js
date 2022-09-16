// import required modules
const apiResponse = require("../../common/ApiResponse");
const getOrderService = require("../services/getOrder.service");

// get order controller
const getOrderCtrl = async (req, res) => {
  try {
    let theUserId = req.user.id;
    let theRole = req.user.role;
    let orderId = req.params.id;

    // get order service
    const order = await getOrderService(theUserId, theRole, orderId);

    return apiResponse.success(res, "Order found successfully", order);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "get_order");
  }
};

// export controller
module.exports = getOrderCtrl;
