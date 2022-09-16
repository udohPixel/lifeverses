// import required modules
const apiResponse = require("../../common/ApiResponse");
const deleteOrderService = require("../services/deleteOrder.service");

// delete order controller
const deleteOrderCtrl = async (req, res) => {
  try {
    let orderId = req.params.id;

    // delete order service
    const order = await deleteOrderService(orderId);

    return apiResponse.success(res, "Order deleted successfully", order);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "delete_order");
  }
};

// export controller
module.exports = deleteOrderCtrl;
