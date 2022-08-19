// import required modules
const User = require("../models/User");

// get all users service
const getAllUsersService = () => {
  // fetch all users from dB
  return User.find().exec();
};

// export service
module.exports = getAllUsersService;
