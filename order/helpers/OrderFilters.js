// app features
class OrderFilters {
  // order filter function
  filterItems(query, queryStr) {
    let theKeyword = {};

    theKeyword.$or = [{ _id: { $regex: queryStr.keyword, $options: "i" } }];

    let theOrderStatus =
      queryStr.orderStatus && queryStr.orderStatus.split(",");

    let queryObject = {};

    if (queryStr.keyword && queryStr.orderStatus) {
      queryObject = {
        ...theKeyword,
        orderStatus: theOrderStatus,
      };
    } else if (queryStr.keyword) {
      queryObject = { ...theKeyword };
    } else if (queryStr.orderStatus) {
      queryObject = { orderStatus: theOrderStatus };
    } else {
      queryObject = {};
    }

    // find by keyword or orderStatus
    query = query.find(queryObject).exec();

    return query;
  }
}

const orderFilters = new OrderFilters();

// export
module.exports = orderFilters;
