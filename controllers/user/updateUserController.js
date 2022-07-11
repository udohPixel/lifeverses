// import User model
const User = require("../../models/User");

// update/save user controller
const updateUserController = async (req, res) => {
  // declare userValues object
  const userValues = {};

  // pass user-imputed values into userValues object
  if (req.body.firstname) userValues.firstname = req.body.firstname;
  if (req.body.lastname) userValues.lastname = req.body.lastname;
  if (req.body.gender) userValues.gender = req.body.gender;
  if (req.body.username) userValues.username = req.body.username;
  if (req.body.email) userValues.email = req.body.email;
  if (req.body.profilePic) userValues.profilePic = req.body.profilePic;
  if (req.body.bio) userValues.bio = req.body.bio;
  userValues.socialLinks = {};
  if (req.body.facebook) userValues.socialLinks.facebook = req.body.facebook;
  if (req.body.youtube) userValues.socialLinks.youtube = req.body.youtube;
  if (req.body.instagram) userValues.socialLinks.instagram = req.body.instagram;
  if (req.body.linkedin) userValues.socialLinks.linkedin = req.body.linkedin;
  if (req.body.twitter) userValues.socialLinks.twitter = req.body.twitter;

  // fetch user by id from dB
  await User.findOne({ _id: req.params.id })
    .then((user) => {
      // check if user already exits in dB
      if (!user) {
        return res.status(404).json({
          UserNotFoundError: "No user was found with this id",
        });
      }
      if (user) {
        // update user
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: userValues },
          { new: true }
        )
          .then((user) => {
            return res.json(user);
          })
          .catch((err) => {
            console.log(
              "Error occurred in User update:- While updating user " + err
            );
          });
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in User update:- While fetching user by id " + err
      );
    });
};

// export controller
module.exports = updateUserController;
