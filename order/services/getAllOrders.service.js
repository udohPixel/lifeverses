// import required modules
const orderFilters = require("../helpers/OrderFilters");
const Order = require("../models/Order");

// get all orders service
const getAllOrdersService = (queryStr) => {
  // fetch orders
  let query = Order.find();

  // filter orders
  return orderFilters.filterItems(query, queryStr);
};

// export service
module.exports = getAllOrdersService;
