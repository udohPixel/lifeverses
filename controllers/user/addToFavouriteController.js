// import Scripture model
const User = require("../../models/User");

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

      res.status(200).json({ success: "Added scripture to favourite" });
    } else {
      await user.updateOne({
        $pull: { favouriteScriptures: req.body.scriptureId },
      });

      res.status(200).json({ success: "Removed scripture from favourite" });
    }
  } catch (err) {
    return res.status(500).json({
      AddRemoveError:
        "Error occurred while adding to/removing from favourite: " +
        err?.message,
    });
  }
};

// export controller
module.exports = addToFavouriteController;
