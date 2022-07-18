// import User model
const User = require("../../models/User");

// update/save user controller
const updateUserController = async (req, res) => {
  // object destructuring assignment
  const {
    firstname,
    lastname,
    gender,
    username,
    email,
    profilePic,
    role,
    isActive,
    bio,
    facebook,
    youtube,
    instagram,
    linkedIn,
    twitter,
  } = req.body;

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
          role,
          isActive,
          bio,
          socialLinks,
        };
        // console.log(userValues);

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
