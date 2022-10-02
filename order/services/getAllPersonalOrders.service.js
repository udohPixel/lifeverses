// import required modules
const orderFilters = require("../helpers/OrderFilters");
const Order = require("../models/Order");

// get all orders service
const getAllPersonalOrdersService = (theUserId, queryStr) => {
  // fetch orders
  let query = Order.find({ userId: theUserId });

  // filter orders
  return orderFilters.filterItems(query, queryStr);
};

// export service
module.exports = getAllPersonalOrdersService;
