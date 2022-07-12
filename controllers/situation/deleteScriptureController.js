// import Situation model
const Situation = require("../../models/Situation");

// delete scripture controller
const deleteScriptureController = async (req, res) => {
  // fetch situation by id from dB
  await Situation.findOne({ _id: req.params.situation_id })
    .then((situation) => {
      // check if situation exists with provided id
      if (!situation) {
        return res.status(404).json({
          SituationNotFoundError:
            "No situation was found with id of " + req.params.situation_id,
        });
      }
      if (situation) {
        // fetch scripture ids
        const scriptureIds = situation.scriptures.map((scripture) => {
          return scripture._id.toString();
        });

        // check if scripture to be deleted exists
        if (scriptureIds.includes(req.params.scripture_id.toString())) {
          // get index of scripture to be deleted
          const indexOfScripture = scriptureIds.indexOf(
            req.params.scripture_id
          );

          // delete scripture
          situation.scriptures.splice(indexOfScripture, 1);

          // save situation
          situation
            .save()
            .then((situation) => {
              return res.json(situation);
            })
            .catch((err) => {
              console.log(
                "Error occurred in deleteScriptureController:- While saving situation " +
                  err
              );
            });
        } else {
          return res.status(404).json({
            ScriptureNotFoundError:
              "No scripture was found with id of " + req.params.scripture_id,
          });
        }
      }
    })
    .catch((err) => {
      console.log(
        "Error occurred in deleteScriptureController:- While finding situation " +
          err
      );
    });
};

// export controller
module.exports = deleteScriptureController;
