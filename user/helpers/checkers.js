// import required modules
const User = require("../models/User");

const checkerService = {
  // check if favourite has been added already
  isFavouriteAdded: async (userId, scriptureId) => {
    // get user by id
    let user = await User.findOne({ _id: userId }).exec();

    return user.favouriteScriptures.includes(scriptureId);
  },
};

// export helper
module.exports = checkerService;
