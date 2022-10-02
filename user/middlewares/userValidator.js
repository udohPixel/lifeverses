// import required modules
const apiResponse = require("../../common/ApiResponse");

const {
  login,
  registration,
  updatePersonalUser,
  updatePersonalPassword,
  updateUser,
  addToFavourite,
  passwordForgot,
  passwordReset,
} = require("../validations/userValidationSchema");

// is login values validated
const isLoginValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await login.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    apiResponse.error(res, userValidator.error?.message);
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
    apiResponse.error(res, userValidator.error?.message);
  } else {
    next();
  }
};

// is update personal user values validated
const isUpdatePersonalUserValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await updatePersonalUser.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    apiResponse.error(res, userValidator.error?.message);
  } else {
    next();
  }
};

// is update personal password values validated
const isUpdatePersonalPasswordValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await updatePersonalPassword.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    apiResponse.error(res, userValidator.error?.message);
  } else {
    next();
  }
};

// is  update user values validated
const isUpdateUserValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await updateUser.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    apiResponse.error(res, userValidator.error?.message);
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
    apiResponse.error(res, userValidator.error?.message);
  } else {
    next();
  }
};

// is password forgot values validated
const isPasswordForgotValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await passwordForgot.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    apiResponse.error(res, userValidator.error?.message);
  } else {
    next();
  }
};

// is password reset values validated
const isPasswordResetValidated = async (req, res, next) => {
  // validate user-imputed values
  const userValidator = await passwordReset.validate(req.body);

  // check if user-imputed values had errors
  if (userValidator.error) {
    apiResponse.error(res, userValidator.error?.message);
  } else {
    next();
  }
};

// export
module.exports = {
  isLoginValidated,
  isRegistrationValidated,
  isUpdatePersonalUserValidated,
  isUpdatePersonalPasswordValidated,
  isUpdateUserValidated,
  isAddToFavouriteValidated,
  isPasswordForgotValidated,
  isPasswordResetValidated,
};
