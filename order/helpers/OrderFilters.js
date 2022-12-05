const Order = require("../models/Order");

// app features
class OrderFilters {
  // order filter function
  filterItems(queryStr) {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject.$or = [{ _id: { $regex: queryStr.keyword, $options: "i" } }];
    }

    // find by orderStatus
    if (queryStr.orderStatus) {
      queryObject.orderStatus = String(queryStr.orderStatus).split(",");
    }

    // find by keyword or orderStatus
    return Order.find(queryObject).exec();
  }

  // personal order filter function
  filterPersonalItems(theUserId, queryStr) {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject.$or = [{ _id: { $regex: queryStr.keyword, $options: "i" } }];
    }

    // find by orderStatus
    if (queryStr.orderStatus) {
      queryObject.orderStatus = String(queryStr.orderStatus).split(",");
    }

    return Order.find(queryObject).where("userId").equals(theUserId).exec();
  }
}

const orderFilters = new OrderFilters();

// export
module.exports = orderFilters;
