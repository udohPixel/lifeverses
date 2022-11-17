// import required modules
const Situation = require("../models/Situation");
const ApplicationException = require("../../common/ApplicationException");

// get situation service
const getSituationService = async (situationId) => {
  // fetch situation by id from dB
  let situation = await Situation.findOne({ _id: situationId }).exec();

  // check if situation exists
  if (!situation) {
    throw new ApplicationException("Situation does not exist", 404);
  }

  return situation;
};

// export service
module.exports = getSituationService;
