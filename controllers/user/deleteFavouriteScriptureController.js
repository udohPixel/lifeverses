// import User model
const User = require("../../models/User");

// delete favourite scripture controller
const deleteFavouriteScriptureController = async (req, res) => {
  // fetch user from dB by id
  await User.findOne({ _id: req.user.id })
    .then((user) => {
      // check if user exists with provided id
      if (!user) {
        return res.status(404).json({
          UserNotFoundError: "No user was found with id of " + req.user.id,
        });
      }
      if (user) {
        // fetch user favourite scripture ids
        const favouriteScriptureIds = user.favouriteScriptures.map(
          (favouriteScripture) => {
            return favouriteScripture._id.toString();
          }
        );

        // check if user-provided id is included in favouriteScriptureIds (i.e if it exists)
        if (favouriteScriptureIds.includes(req.params.id.toString())) {
          // get index of favourite scripture to be deleted
          const indexOfFavouriteScripture = favouriteScriptureIds.indexOf(
            req.params.id
          );

          // delete user favourite scripture
          user.favouriteScriptures.splice(indexOfFavouriteScripture, 1);

          // save user
          user
            .save()
            .then((user) => {
              return res.status(200).json(user);
            })
            .catch((err) => {
              console.log("Error occurred while saving user", err);
            });
        } else {
          return res.status(404).json({
            FavouriteScriptureNotFoundError:
              "No favourite scripture was found with id of " + req.params.id,
          });
        }
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in deleteFavouriteScriptureController:- While finding user " +
          err
      );
    });
};

// export controller
module.exports = deleteFavouriteScriptureController;
