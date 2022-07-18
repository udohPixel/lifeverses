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
        SituationNotFoundError: "No situation was found with this id",
      });
    }
    if (situation) {
      let scripture = await Scripture.findOne({
        _id: req.params.scripture_id,
      }).exec();

      // check if scripture to be updated exists
      if (scripture) {
        //check if currently logged in editor is creator of scripture
        if (
          req.user.id == scripture.userId ||
          scripture.role == "Admin" ||
          "SuperAdmin"
        ) {
          // delete scripture
          scripture = await Scripture.findOneAndRemove({
            _id: req.params.scripture_id,
          });

          return res.status(200).json(scripture);
        } else {
          return res.status(403).json({
            UnauthorisedUserError: "Forbidden to edit another user's scripture",
          });
        }
      } else {
        return res.status(404).json({
          ScriptureNotFoundError: "No scripture was found with this id",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      UpdateError: "Error occurred while updating scripture: " + err?.message,
    });
  }
};

// export controller
module.exports = deleteScriptureController;
