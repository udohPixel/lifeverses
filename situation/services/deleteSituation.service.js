// import required modules
const Situation = require("../models/Situation");
const ApplicationException = require("../../common/ApplicationException");

const deleteSituationService = async (situationId) => {
  // fetch situation by id from dB
  let situation = await Situation.findOne({ _id: situationId }).exec();

  // check if situation exists
  if (!situation) {
    throw new ApplicationException("Situation does not exist", 404);
  }

  // delete situation
  situation = await Situation.findOneAndRemove({ _id: situationId });

  return situation;
};

module.exports = deleteSituationService;
