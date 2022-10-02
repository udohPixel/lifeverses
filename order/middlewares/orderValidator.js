// import required modules
const apiResponse = require("../../common/ApiResponse");

const {
  addOrder,
  updateOrderStatus,
} = require("../validations/orderValidationSchema");

// is add order values validated
const isAddOrderValidated = async (req, res, next) => {
  // validate user-imputed values
  const orderValidator = await addOrder.validate(req.body);

  // check if user-imputed values had errors
  if (orderValidator.error) {
    apiResponse.error(res, orderValidator.error?.message);
  } else {
    next();
  }
};

// is update order status values validated
const isUpdateOrderStatusValidated = async (req, res, next) => {
  // validate user-imputed values
  const orderValidator = await updateOrderStatus.validate(req.body);

  // check if user-imputed values had errors
  if (orderValidator.error) {
    apiResponse.error(res, orderValidator.error?.message);
  } else {
    next();
  }
};

// export
module.exports = {
  isAddOrderValidated,
  isUpdateOrderStatusValidated,
};
