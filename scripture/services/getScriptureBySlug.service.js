// import required modules
const ApplicationException = require("../../common/ApplicationException");
const Situation = require("../../situation/models/Situation");
const Scripture = require("../models/Scripture");

// get scripture service
const getScriptureBySlugService = async (situationSlug, theSlug) => {
  // fetch situation by id from dB
  let situation = await Situation.findOne({ slug: situationSlug }).exec();

  // check if situation exists
  if (!situation) {
    throw new ApplicationException("Situation does not exist", 404);
  }

  // fetch scripture by slug
  let scripture = await Scripture.findOne({
    slug: theSlug,
    situationId: situation.id,
  }).exec();

  // check if scripture exists in the situation
  if (!scripture) {
    throw new ApplicationException(
      "Scripture does not exist for this situation",
      404
    );
  }

  return scripture;
};

// export service
module.exports = getScriptureBySlugService;
