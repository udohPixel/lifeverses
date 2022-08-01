// import required modules
const Situation = require("../../situation/models/Situation");
const Scripture = require("../models/Scripture");
const ApplicationException = require("../../common/ApplicationException");

// update scripture service
const updateScriptureService = async (req, bibleTitle, bibleChapter) => {
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

  // get other data
  let userId;
  let situationId = req.params.situation_id;
  let bibleVerses = req.body.bibleVerses.split(",");

  // check if user is editor, admin or super admin
  // to allow anonymous edit of scripture by admin or super admin
  if (req.user.role == "Editor") {
    userId = req.user.id;
  }
  if (req.user.role == "Admin" || req.user.role == "SuperAdmin") {
    userId = scripture.userId;
  }

  // pass user-imputed values into scriptureValues object
  const scriptureValues = {
    userId,
    situationId,
    bibleTitle,
    bibleChapter,
    bibleVerses,
  };

  // update scripture with scriptureValues from user
  scripture = await Scripture.findOneAndUpdate(
    { id: req.params.scripture_id },
    { $set: scriptureValues },
    { new: true }
  );

  return scripture;
};

// export service
module.exports = updateScriptureService;
