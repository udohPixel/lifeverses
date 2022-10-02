// app features
class UserFilters {
  // search function
  filterItems(query, queryStr) {
    let queryObject = {};

    // find by keyword
    if (queryStr.keyword) {
      queryObject.$or = [
        { firstname: { $regex: queryStr.keyword, $options: "i" } },
        { lastname: { $regex: queryStr.keyword, $options: "i" } },
        { username: { $regex: queryStr.keyword, $options: "i" } },
      ];
    }

    // find by gender
    if (queryStr.gender) {
      queryObject.gender = String(queryStr.gender).split(",");
    }

    // find by careerField
    if (queryStr.careerField) {
      queryObject.careerField = String(queryStr.careerField).split(",");
    }

    // find by keyword, gender or careerField
    query = query.find(queryObject).exec();

    return query;
  }
}

const userFilters = new UserFilters();

// export
module.exports = userFilters;
