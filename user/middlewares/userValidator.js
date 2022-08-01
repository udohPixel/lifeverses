// import required utils
const {
  login,
  registration,
  updatePersonalUser,
  updateUser,
  addToFavourite,
} = require("../validations/userValidationSchema");

// is login values validated
const isLoginValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await login.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    res.json({
      success: false,
      message: userValidator.error?.message,
    });
  } else {
    next();
  }
};

// is registration values validated
const isRegistrationValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await registration.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    res.json({
      success: false,
      message: userValidator.error?.message,
    });
  } else {
    next();
  }
};

// is registration values validated
const isUpdatePersonalUserValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await updatePersonalUser.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    res.json({
      success: false,
      message: userValidator.error?.message,
    });
  } else {
    next();
  }
};

// is registration values validated
const isUpdateUserValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await updateUser.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    res.json({
      success: false,
      message: userValidator.error?.message,
    });
  } else {
    next();
  }
};

// is add favourite scripture values validated controller
const isAddToFavouriteValidated = async (req, res, next) => {
  // validate user-imputed values
  const favouriteScriptureValidator = await addToFavourite.validate(req.body);

  // check if user-imputed values had errors
  if (favouriteScriptureValidator.error) {
    res.json({
      success: false,
      message: favouriteScriptureValidator.error?.message,
    });
  } else {
    next();
  }
};

// export
module.exports = {
  isLoginValidated,
  isRegistrationValidated,
  isUpdatePersonalUserValidated,
  isUpdateUserValidated,
  isAddToFavouriteValidated,
};
