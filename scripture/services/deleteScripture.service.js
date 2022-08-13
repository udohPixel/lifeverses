// import required modules
const Situation = require("../../situation/models/Situation");
const Scripture = require("../models/Scripture");
const ApplicationException = require("../../common/ApplicationException");
const { isAdmin, isSuperAdmin } = require("../../common/helpers");

// delete scripture service
const deleteScriptureService = async (
  theRole,
  theUserId,
  situationId,
  scriptureId
) => {
  // fetch situation by id from dB
  let situation = await Situation.findOne({ _id: situationId }).exec();

  // check if situation exists
  if (!situation) {
    throw new ApplicationException("Situation does not exist", 404);
  }

  // fetch scripture by id from dB
  let scripture = await Scripture.findOne({ _id: scriptureId }).exec();

  // check if scripture to be updated exists
  if (!scripture) {
    throw new ApplicationException("Scripture does not exist", 404);
  }

  //check if currently logged in editor is creator of scripture
  let creatorId = scripture.userId;

  let isCreator =
    theUserId === creatorId || isAdmin(theRole) || isSuperAdmin(theRole);

  if (!isCreator) {
    throw new ApplicationException("Unauthorised", 401);
  }

  // delete scripture
  scripture = await Scripture.findOneAndRemove({ _id: scriptureId });

  return scripture;
};

// export service
module.exports = deleteScriptureService;
