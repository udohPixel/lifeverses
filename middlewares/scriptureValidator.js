// import required utils
const {
  addScripture,
  updateScripture,
} = require("../utils/scriptureValidatorSchema");

// is add scripture values validated controller
const isAddScriptureValidated = async (req, res, next) => {
  // validate user-imputed values
  const scriptureValidator = await addScripture.validate(req.body);

  // check if user-imputed values had errors
  if (scriptureValidator.error) {
    res.json({
      success: false,
      message: scriptureValidator.error?.message,
    });
  } else {
    next();
  }
};

// is update scripture values validated controller
const isUpdateScriptureValidated = async (req, res, next) => {
  // validate user-updated values
  const scriptureValidator = await updateScripture.validate(req.body);

  // check if user-updated values had errors
  if (scriptureValidator.error) {
    res.json({
      success: false,
      message: scriptureValidator.error?.message,
    });
  } else {
    next();
  }
};

// export is add scripture validated
module.exports = {
  isAddScriptureValidated,
  isUpdateScriptureValidated,
};
