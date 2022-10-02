// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");

// get user service
const getUserService = async (theUsername) => {
  // fetch user by username from dB
  let user = await User.findOne({ username: theUsername.toLowerCase() })
    .where("role")
    .ne("SuperAdmin")
    .select("-role")
    .select("-password")
    .exec();

  // check if user exists with provided username
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  return user;
};

// export service
module.exports = getUserService;
