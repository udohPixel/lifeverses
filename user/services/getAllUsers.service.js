// import required modules
const userFilters = require("../helpers/UserFilters");

// get all users service
const getAllUsersService = async (queryStr) => {
  // filter users
  return userFilters.filterItems(queryStr);
};

// export service
module.exports = getAllUsersService;
