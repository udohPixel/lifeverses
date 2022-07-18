// import User model
const User = require("../../models/User");

// update/save user controller
const updateUserPersonalController = async (req, res) => {
  // object destructuring assignment
  const {
    firstname,
    lastname,
    gender,
    username,
    email,
    profilePic,
    bio,
    facebook,
    youtube,
    instagram,
    linkedIn,
    twitter,
  } = req.body;

  // fetch user by id from dB
  await User.findOne({ _id: req.user.id })
    .then((user) => {
      // check if user already exits in dB
      if (user) {
        const socialLinks = {
          facebook,
          youtube,
          instagram,
          linkedIn,
          twitter,
        };
        // pass user-imputed values into userValues object
        const userValues = {
          firstname,
          lastname,
          gender,
          username,
          email,
          profilePic,
          bio,
          socialLinks,
        };

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
