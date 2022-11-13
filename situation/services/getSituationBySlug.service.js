// import required modules
const Situation = require("../models/Situation");
const ApplicationException = require("../../common/ApplicationException");

// get situation service
const getSituationBySlugService = async (theSlug) => {
  // fetch situation by slug from dB
  let situation = await Situation.findOne({ slug: theSlug });

  // check if situation exists
  if (!situation) {
    throw new ApplicationException("Situation does not exist", 404);
  }

  return situation;
};

// export service
module.exports = getSituationBySlugService;
