// import required models
const Situation = require("../../models/Situation");
const Scripture = require("../../models/Scripture");

// update scripture controller
const updateScriptureController = async (req, res) => {
  try {
    // object destructuring assignment
    const { bibleTitle, bibleChapter } = req.body;

    // fetch situation by id from dB
    let situation = await Situation.findOne({
      _id: req.params.situation_id,
    }).exec();

    // check if situation exists
    if (!situation) {
      return res.status(404).json({
        SituationNotFoundError: "No situation was found with this id",
      });
    }

    let scripture = await Scripture.findOne({
      _id: req.params.scripture_id,
    }).exec();

    // check if scripture to be updated exists
    if (!scripture) {
      return res.status(404).json({
        ScriptureNotFoundError: "No scripture was found with this id",
      });
    }

    //check if currently logged in editor is creator of scripture
    let isCreator =
      req.user.id == scripture.userId ||
      req.user.role == "Admin" ||
      req.user.role == "SuperAdmin";

    if (!isCreator) {
      return res.status(403).json({
        UnauthorisedUserError: "Forbidden to edit another user's scripture",
      });
    }

    // get other data
    var userId;
    var situationId = req.params.situation_id;
    var bibleVerses = req.body.bibleVerses.split(",");

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

    return res.status(200).json(scripture);
  } catch (err) {
    return res.status(500).json({
      UpdateError: "Error occurred while updating scripture: " + err?.message,
    });
  }
};

// export controller
module.exports = updateScriptureController;
