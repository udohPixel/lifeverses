// app features
class ProductFilters {
  // product category filter function
  filterItems(query, queryStr) {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject.$or = [
        { title: { $regex: queryStr.keyword, $options: "i" } },
        { overview: { $regex: queryStr.keyword, $options: "i" } },
      ];
    }

    // find by category
    if (queryStr.category) {
      queryObject.category = String(queryStr.category).split(",");
    }

    // find by keyword or category
    query = query.find(queryObject).exec();

    return query;
  }
}

const productFilters = new ProductFilters();

// export
module.exports = productFilters;
