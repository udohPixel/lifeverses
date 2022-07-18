// import Situation model
const Situation = require("../../models/Situation");

// fetch situation controller
const getSituationController = async (req, res) => {
  try {
    // fetch situation by id from dB
    let situation = await Situation.findOne({ _id: req.params.id }).exec();

    // check if situation exists
    if (!situation) {
      return res.status(404).json({
        SituationNotFound: "No situation was found with this id",
      });
    } else {
      res.status(200).json(situation);
    }
  } catch (err) {
    return res
      .status(500)
      .json({
        FetchError: "Error in fetching situation by id:" + err?.message,
      });
  }
};

// export controller
module.exports = getSituationController;
