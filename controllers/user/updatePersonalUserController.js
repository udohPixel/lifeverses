// import User model
const User = require("../../models/User");

// update/save user controller
const updateUserPersonalController = async (req, res) => {
  // declare userValues object
  const userValues = {};

  // pass user-imputed values into userValues object
  if (req.body.firstname) userValues.firstname = req.body.firstname;
  if (req.body.lastname) userValues.lastname = req.body.lastname;
  if (req.body.gender) userValues.gender = req.body.gender;
  if (req.body.username) userValues.username = req.body.username;
  if (req.body.email) userValues.email = req.body.email;
  if (req.body.profilePic) userValues.profilePic = req.body.profilePic;
  if (typeof req.body.hobbies !== "undefined") {
    userValues.hobbies = req.body.hobbies.split(",");
  }
  if (req.body.bio) userValues.bio = req.body.bio;
  userValues.socialLinks = {};
  if (req.body.facebook) userValues.socialLinks.facebook = req.body.facebook;
  if (req.body.youtube) userValues.socialLinks.youtube = req.body.youtube;
  if (req.body.instagram) userValues.socialLinks.instagram = req.body.instagram;
  if (req.body.linkedin) userValues.socialLinks.linkedin = req.body.linkedin;
  if (req.body.twitter) userValues.socialLinks.twitter = req.body.twitter;

  // fetch user by id from dB
  await User.findOne({ _id: req.user.id })
    .then((user) => {
      // check if user already exits in dB
      if (user) {
        // update user
        User.findOneAndUpdate(
          { _id: req.user.id },
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
      } else {
        // fetch user by username
        User.findOne({ username: userValues.username })
          .then((user) => {
            // check if username already exists in dB
            if (user) {
              res.status(400).json({
                UsernameError: "Username already exists in dB",
              });
            } else {
              // save user
              new User(userValues)
                .save()
                .then((user) => {
                  return res.json(user);
                })
                .catch((err) => {
                  console.log(
                    "Error occurred in User update:- While saving user details " +
                      err
                  );
                });
            }
          })
          .catch((err) => {
            console.log(
              "Error occurred in User update:- While fetching user by username " +
                err
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
module.exports = updateUserPersonalController;
