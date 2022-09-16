// app features
class UserFilters {
  // search function
  filterItems(query, queryStr) {
    let theKeyword = {};

    theKeyword.$or = [
      { firstname: { $regex: queryStr.keyword, $options: "i" } },
      { lastname: { $regex: queryStr.keyword, $options: "i" } },
      { username: { $regex: queryStr.keyword, $options: "i" } },
    ];

    let theGender = queryStr.gender && queryStr.gender.split(",");

    let theCareerField =
      queryStr.careerField && queryStr.careerField.split(",");

    let queryObject = {};

    if (queryStr.keyword && queryStr.gender && queryStr.careerField) {
      queryObject = {
        ...theKeyword,
        gender: theGender,
        careerField: theCareerField,
      };
    } else if (queryStr.keyword && queryStr.careerField) {
      queryObject = {
        ...theKeyword,
        careerField: theCareerField,
      };
    } else if (queryStr.keyword && queryStr.gender) {
      queryObject = {
        ...theKeyword,
        gender: theGender,
      };
    } else if (queryStr.gender && queryStr.careerField) {
      queryObject = {
        gender: theGender,
        careerField: theCareerField,
      };
    } else if (queryStr.keyword) {
      queryObject = { ...theKeyword };
    } else if (queryStr.gender) {
      queryObject = { gender: theGender };
    } else if (queryStr.careerField) {
      queryObject = { careerField: theCareerField };
    } else {
      queryObject = {};
    }

    // find by keyword, gender or careerField
    query = query.find(queryObject).exec();

    return query;
  }
}

const userFilters = new UserFilters();

// export
module.exports = userFilters;
