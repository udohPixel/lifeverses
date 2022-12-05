const Product = require("../models/Product");

// app features
class ProductFilters {
  // product category filter function
  filterItems(queryStr) {
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
    return Product.find(queryObject).exec();
  }

  // personal product category filter function
  filterPersonalItems(theUserId, queryStr) {
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
    return Product.find(queryObject).where("userId").equals(theUserId).exec();
  }
}

const productFilters = new ProductFilters();

// export
module.exports = productFilters;
