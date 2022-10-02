// import required modules
const apiResponse = require("../../common/ApiResponse");

const addOrderService = require("../services/addOrder.service");

// add order controller
const addOrderCtrl = async (req, res) => {
  try {
    let userId = req.user.id;

    const { orderProducts, shippingInfo, paymentInfo, shippingPrice } =
      req.body;

    // add order service
    const order = await addOrderService(
      userId,
      orderProducts,
      shippingInfo,
      paymentInfo,
      shippingPrice
    );

    return apiResponse.success(res, "Order created successfully", order, 201);
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "add-order");
  }
};

// export controller
module.exports = addOrderCtrl;
