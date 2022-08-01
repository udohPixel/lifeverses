// import required modules
const Situation = require("../../situation/models/Situation");
const Scripture = require("../models/Scripture");
const ApplicationException = require("../../common/ApplicationException");

// delete scripture service
const deleteScriptureService = async (req) => {
  // fetch situation by id from dB
  let situation = await Situation.findOne({
    _id: req.params.situation_id,
  }).exec();

  // check if situation exists
  if (!situation) {
    throw new ApplicationException("Situation does not exist", 404);
  }

  let scripture = await Scripture.findOne({
    _id: req.params.scripture_id,
  }).exec();

  // check if scripture to be updated exists
  if (!scripture) {
    throw new ApplicationException("Scripture does not exist", 404);
  }

  //check if currently logged in editor is creator of scripture
  let isCreator =
    req.user.id == scripture.userId ||
    req.user.role == "Admin" ||
    req.user.role == "SuperAdmin";

  if (!isCreator) {
    throw new ApplicationException("You are not authorised", 403);
  }

  // delete scripture
  scripture = await Scripture.findOneAndRemove({
    _id: req.params.scripture_id,
  });

  return scripture;
};

// export service
module.exports = deleteScriptureService;
