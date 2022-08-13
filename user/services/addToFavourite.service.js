// import require modules
const User = require("../models/User");

// add to favourite services
const addToFavouriteService = {
  addToFavourite: async (userId, scriptureId) => {
    // get user by id
    let user = await User.findOne({ _id: userId }).exec();

    let theUser = await user.updateOne({
      $push: { favouriteScriptures: scriptureId },
    });

    return theUser.favouriteScriptures;
  },

  removeFromFavourite: async (userId, scriptureId) => {
    // get user by id
    let user = await User.findOne({ _id: userId }).exec();

    let theUser = await user.updateOne({
      $pull: { favouriteScriptures: scriptureId },
    });

    return theUser.favouriteScriptures;
  },
};

// export service
module.exports = addToFavouriteService;
