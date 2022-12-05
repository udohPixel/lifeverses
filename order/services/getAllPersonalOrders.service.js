// import required modules
const orderFilters = require("../helpers/OrderFilters");

// get all orders service
const getAllPersonalOrdersService = (theUserId, queryStr) => {

  // filter orders
  return orderFilters.filterPersonalItems(theUserId, queryStr);
};

// export service
module.exports = getAllPersonalOrdersService;
