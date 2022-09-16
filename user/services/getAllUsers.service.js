// import required modules
const userFilters = require("../helpers/UserFilters");
const User = require("../models/User");

// get all users service
const getAllUsersService = (queryStr) => {
  // fetch users
  let query = User.find()
    .where("role")
    .ne("SuperAdmin")
    .select("-role")
    .select("-password");

  // filter users
  return userFilters.filterItems(query, queryStr);
};

// export service
module.exports = getAllUsersService;
