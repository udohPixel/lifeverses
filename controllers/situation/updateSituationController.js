// import Situation model
const Situation = require("../../models/Situation");

// update situation controller
const updateSituationController = async (req, res) => {
  try {
    // object destructuring assignment
    const { title, colour, icon } = req.body;

    // fetch situation by id from dB
    let situation = await Situation.findOne({ _id: req.params.id }).exec();

    // check if situation exists
    if (!situation) {
      return res.status(404).json({
        SituationNotFoundError: "No situation was found with this id",
      });
    }
    if (situation) {
      // pass user-imputed fields into situationValues object
      const situationValues = { title, colour, icon };

      // update situation
      situation = await Situation.findOneAndUpdate(
        { _id: req.params.id },
        { $set: situationValues },
        { new: true }
      );

      return res.status(200).json(situation);
    }
  } catch (err) {
    return res.status(500).json({
      UpdateError: "Error occurred while updating situation: " + err?.message,
    });
  }
};

// export controller
module.exports = updateSituationController;
