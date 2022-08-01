// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");

// get user service
const getUserService = async (req) => {
  // fetch user by username from dB
  let user = await User.findOne({ username: req.params.username }).exec();

  // check if user exists with provided username
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  return user;
};

// export service
module.exports = getUserService;
