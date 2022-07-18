// import Situation model
const Situation = require("../../models/Situation");

// delete situation controller
const deleteSituationController = async (req, res) => {
  try {
    // fetch situation by id from dB
    let situation = await Situation.findOne({ _id: req.params.id }).exec();

    // check if situation exists
    if (!situation) {
      return res.status(404).json({
        SituationNotFoundError: "No situation was found with this id",
      });
    }
    if (situation) {
      // delete situation
      situation = await Situation.findOneAndRemove({ _id: req.params.id });

      return res.status(200).json(situation);
    }
  } catch (err) {
    return res.status(500).json({
      DeleteError: "Error occurred while deleting situation: " + err?.message,
    });
  }
};

// export controller
module.exports = deleteSituationController;
