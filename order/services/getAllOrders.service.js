// import required modules
const orderFilters = require("../helpers/OrderFilters");

// get all orders service
const getAllOrdersService = (queryStr) => {
  // // fetch orders
  // let query = Order.find();

  // filter orders
  return orderFilters.filterItems(queryStr);
};

// export service
module.exports = getAllOrdersService;
