// import required modules
const User = require("../models/User");
const apiResponse = require("../../common/ApiResponse");
const { isFavouriteAdded } = require("../helpers/checkers");
const {
  addToFavourite,
  removeFromFavourite,
} = require("../services/addToFavourite.service");

// add to favourite controller
const addToFavouriteCtrl = async (req, res) => {
  try {
    let userId = req.user.id;
    let scriptureId = req.body.scriptureId;

    let isFavouriteAddedCheck = await isFavouriteAdded(userId, scriptureId);

    // console.log(isFavouriteAddedCheck);

    // check if scripture had already been addeded to favourite
    if (isFavouriteAddedCheck === false) {
      // add to favourite microservice
      const favouriteScriptures = await addToFavourite(userId, scriptureId);

      return apiResponse.success(
        res,
        "Scripture was added to favourite successfully",
        favouriteScriptures,
        201
      );
    }

    if (isFavouriteAddedCheck === true) {
      // add to favourite microservice
      const favouriteScriptures = await removeFromFavourite(
        userId,
        scriptureId
      );

      return apiResponse.success(
        res,
        "Scripture was removed from favourite successfully",
        favouriteScriptures,
        200
      );
    }
  } catch (error) {
    return apiResponse.errorObject(res, error, null, "add_to_favourite");
  }
};

// export controller
module.exports = addToFavouriteCtrl;
