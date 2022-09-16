// app features
class ProductFilters {
  // product category filter function
  filterItems(query, queryStr) {
    let theKeyword = {};

    theKeyword.$or = [
      { title: { $regex: queryStr.keyword, $options: "i" } },
      { overview: { $regex: queryStr.keyword, $options: "i" } },
    ];

    let theCategories = queryStr.category && queryStr.category.split(",");

    let queryObject = {};

    if (queryStr.keyword && queryStr.category) {
      queryObject = {
        ...theKeyword,
        category: theCategories,
      };
    } else if (queryStr.keyword) {
      queryObject = { ...theKeyword };
    } else if (queryStr.category) {
      queryObject = { category: theCategories };
    } else {
      queryObject = {};
    }

    // find by keyword or category
    query = query.find(queryObject).exec();

    return query;
  }
}

const productFilters = new ProductFilters();

// export
module.exports = productFilters;
