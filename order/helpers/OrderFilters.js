// app features
class OrderFilters {
  // order filter function
  filterItems(query, queryStr) {
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
    query = query.find(queryObject).exec();

    return query;
  }
}

const orderFilters = new OrderFilters();

// export
module.exports = orderFilters;
