// import User model
const User = require("../../models/User");

// add to favourite scripture controller
const addFavouriteScriptureController = async (req, res) => {
  // fetch user by id from dB
  await User.findOne({ _id: req.user.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          UserNotFoundError: "No user was found with this id",
        });
      }
      if (user) {
        // check if favourite scripture already exists in dB
        // else do the below (add new favourite scripture
        ////////////////

        // declare favScriptureValues object
        const favScriptureValues = {};

        // pass user favourite scripture values into favScriptureValues
        if (req.body.situationTitle)
          favScriptureValues.situationTitle = req.body.situationTitle;
        if (req.body.bibleTitle)
          favScriptureValues.bibleTitle = req.body.bibleTitle;
        if (req.body.bibleVerse)
          favScriptureValues.bibleVerse = req.body.bibleVerse;

        // update user favourite scriptures
        user
          .updateOne({ $push: { favouriteScriptures: favScriptureValues } })
          .then((user) => {
            return res.status(200).json(user);
          })
          .catch((err) => {
            console.log(
              "Error occurred in addFavouriteScriptureController:- While updating user favourite scripture " +
                err
            );
          });
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in addFavouriteScriptureController:- While finding user " +
          err
      );
    });
};

// export controller
module.exports = addFavouriteScriptureController;
