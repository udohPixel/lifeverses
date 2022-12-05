// import required modules
const Situation = require("../../situation/models/Situation");
const Scripture = require("../models/Scripture");
const ApplicationException = require("../../common/ApplicationException");
const { scriptureSlug } = require("../helpers/checkers");
const { isEditor, isAdmin, isSuperAdmin } = require("../../common/helpers");

// update scripture service
const updateScriptureService = async (
  theRole,
  theUserId,
  theSituationId,
  scriptureId,
  bibleTitle,
  bibleChapter,
  bibleVerses
) => {
  // fetch situation by id from dB
  let situation = await Situation.findOne({ _id: theSituationId }).exec();

  // check if situation exists
  if (!situation) {
    throw new ApplicationException("Situation does not exist", 404);
  }

  // fetch scripture by id from dB
  let scripture = await Scripture.findOne({
    _id: scriptureId,
    situationId: theSituationId,
  }).exec();

  // check if scripture to be updated exists
  if (!scripture) {
    throw new ApplicationException("Scripture does not exist", 404);
  }

  //check if currently logged in editor is creator of scripture
  let isCreator =
    theUserId === scripture.userId || isAdmin(theRole) || isSuperAdmin(theRole);

  if (!isCreator) {
    throw new ApplicationException("Unauthorised", 401);
  }

  // get other data
  let userId;

  // check if user is editor, admin or super admin
  // to allow anonymous edit of scripture by admin or super admin
  if (isEditor(theRole)) {
    userId = theUserId;
  }
  if (isAdmin(theRole) || isSuperAdmin(theRole)) {
    userId = scripture.userId;
  }

  let slug = scriptureSlug(bibleVerses, bibleTitle, bibleChapter);

  // pass user-imputed values into scriptureValues object
  const scriptureValues = {
    userId,
    slug,
    situationId: theSituationId,
    bibleTitle,
    bibleChapter,
    bibleVerses,
  };

  // update scripture with scriptureValues from user
  scripture = await Scripture.findOneAndUpdate(
    { _id: scriptureId },
    { $set: scriptureValues },
    { new: true }
  );

  return scripture;
};

// export service
module.exports = updateScriptureService;
