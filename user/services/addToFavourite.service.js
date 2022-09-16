// import require modules
const User = require("../models/User");
const Scripture = require("../../scripture/models/Scripture");
const ApplicationException = require("../../common/ApplicationException");

// add to favourite services
const addToFavouriteService = {
  addToFavourite: async (userId, scriptureId) => {
    // check if scripture exists
    let scripture = await Scripture.findOne({ _id: scriptureId }).exec();
    if (!scripture) {
      throw new ApplicationException("Scripture does not exist");
    }

    // get user by id
    let user = await User.findOne({ _id: userId }).exec();

    let theUser = await user.updateOne({
      $push: { favouriteScriptures: scriptureId },
    });

    return theUser.favouriteScriptures;
  },

  removeFromFavourite: async (userId, scriptureId) => {
    // check if scripture exists
    let scripture = await Scripture.findOne({ _id: scriptureId }).exec();
    if (!scripture) {
      throw new ApplicationException("Scripture does not exist", 404);
    }

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
