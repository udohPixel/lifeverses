// import required modules
const User = require("../models/User");
const apiResponse = require("../../common/ApiResponse");

// add to favourite controller
const addToFavouriteCtrl = async (req, res) => {
  try {
    // get user by id
    let user = await User.findOne({ _id: req.params.id }).exec();

    // check if scripture had already been addeded to favourite
    if (!user.favouriteScriptures.includes(req.body.scriptureId)) {
      await user.updateOne({
        $push: { favouriteScriptures: req.body.scriptureId },
      });

      return apiResponse.success(
        res,
        "Scripture was added to favourite successfully",
        user.favouriteScriptures,
        201
      );
    } else {
      await user.updateOne({
        $pull: { favouriteScriptures: req.body.scriptureId },
      });

      return apiResponse.success(
        res,
        "Scripture was removed from favourite successfully",
        user.favouriteScriptures,
        200
      );
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "add_to_favourite");
  }
};

// export controller
module.exports = addToFavouriteCtrl;
