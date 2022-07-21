// import required models
const Situation = require("../../models/Situation");
const Scripture = require("../../models/Scripture");

// delete scripture controller
const deleteScriptureController = async (req, res) => {
  try {
    // fetch situation by id from dB
    let situation = await Situation.findOne({
      _id: req.params.situation_id,
    }).exec();

    // check if situation exists
    if (!situation) {
      return res.status(404).json({
        SituationNotFoundError: "Situation does not exist",
      });
    }

    let scripture = await Scripture.findOne({
      _id: req.params.scripture_id,
    }).exec();

    // check if scripture to be updated exists
    if (!scripture) {
      return res.status(404).json({
        ScriptureNotFoundError: "Scripture does not exist",
      });
    }

    //check if currently logged in editor is creator of scripture
    let isCreator =
      req.user.id == scripture.userId ||
      req.user.role == "Admin" ||
      req.user.role == "SuperAdmin";

    if (!isCreator) {
      return res.status(403).json({
        UnauthorisedUserError: "User is not authorised",
      });
    }

    // delete scripture
    scripture = await Scripture.findOneAndRemove({
      _id: req.params.scripture_id,
    });

    return res.status(200).json(scripture);
  } catch (err) {
    return res.status(500).json({
      UpdateError: "Error occurred while updating scripture: " + err?.message,
    });
  }
};

// export controller
module.exports = deleteScriptureController;
