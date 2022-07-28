// import Scripture model
const User = require("../../models/User");
const logger = require("../../logger/index");

// add to favourite controller
const addToFavouriteController = async (req, res) => {
  try {
    // get user by id
    let user = await User.findOne({ _id: req.params.id }).exec();

    // check if scripture had already been addeded to favourite
    if (!user.favouriteScriptures.includes(req.body.scriptureId)) {
      await user.updateOne({
        $push: { favouriteScriptures: req.body.scriptureId },
      });

      res.status(200).json({
        success: true,
        message: "Scripture was added to favourite successfully",
        data: user.favouriteScriptures,
      });
    } else {
      await user.updateOne({
        $pull: { favouriteScriptures: req.body.scriptureId },
      });

      res.status(200).json({
        success: true,
        message: "Scripture was removed from favourite successfully",
        data: user.favouriteScriptures,
      });
    }
  } catch (err) {
    logger.error(
      "Error occurred while adding to/removing from favourite: " + err?.message,
      {
        meta: add_to_favourite,
      }
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding to/removing from favourite",
    });
  }
};

// export controller
module.exports = addToFavouriteController;
