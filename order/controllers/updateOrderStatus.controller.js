// import required modules
const apiResponse = require("../../common/ApiResponse");
const updateOrderStatusService = require("../services/updateOrderStatus.service");

// update order status controller
const updateOrderStatusCtrl = async (req, res) => {
  try {
    let orderId = req.params.id;
    let theOrderStatus = req.body.orderStatus;

    // update order status service
    const order = await updateOrderStatusService(orderId, theOrderStatus);

    return apiResponse.success(res, "Order updated successfully", order);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "update_order");
  }
};

// export controller
module.exports = updateOrderStatusCtrl;
