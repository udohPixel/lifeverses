// import required utils
const {
  addSituation,
  updateSituation,
} = require("../utils/situationValidatorSchema");

// is add situation values validated controller
const isAddSituationValidated = async (req, res, next) => {
  // validate user-imputed values
  const situationValidator = await addSituation.validate(req.body);

  // check if user-imputed values had errors
  if (situationValidator.error) {
    res.json({
      success: false,
      message: situationValidator.error?.message,
    });
  } else {
    next();
  }
};

// is update situation values validated controller
const isUpdateSituationValidated = async (req, res, next) => {
  // validate user-updated values
  const situationValidator = await updateSituation.validate(req.body);

  // check if user-updated values had errors
  if (situationValidator.error) {
    res.json({
      success: false,
      message: situationValidator.error?.message,
    });
  } else {
    next();
  }
};

// export is add situation validated
module.exports = {
  isAddSituationValidated,
  isUpdateSituationValidated,
};
