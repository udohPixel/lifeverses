// import required modules
const User = require("../models/User");
const ApplicationException = require("../../common/ApplicationException");

// get personal user service
const getPersonalUserService = async (req) => {
  // fetch user by id from dB
  let user = await User.findOne({ _id: req.user.id }).exec();

  // check if user exists
  if (!user) {
    throw new ApplicationException("User does not exist", 404);
  }

  return user;
};

// export service
module.exports = getPersonalUserService;
