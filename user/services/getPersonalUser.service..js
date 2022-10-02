// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");

// get personal user service
const getPersonalUserService = async (userId) => {
  // fetch user by id from dB
  let user = await User.findOne({ _id: userId })
    .select("-role")
    .select("-password")
    .exec();

  // check if user exists
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  return user;
};

// export service
module.exports = getPersonalUserService;
