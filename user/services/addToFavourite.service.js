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
      throw new ApplicationException("Scripture does not exist", 404);
    }

    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { favouriteScriptures: scriptureId } }
    ).exec();

    // get user by id
    let user = await User.findOne({ _id: userId });

    return user.favouriteScriptures;
  },

  removeFromFavourite: async (userId, scriptureId) => {
    // check if scripture exists
    let scripture = await Scripture.findOne({ _id: scriptureId }).exec();
    if (!scripture) {
      throw new ApplicationException("Scripture does not exist", 404);
    }

    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { favouriteScriptures: scriptureId } }
    ).exec();

    // get user by id
    let user = await User.findOne({ _id: userId });

    return user.favouriteScriptures;
  },
};

// export service
module.exports = addToFavouriteService;
