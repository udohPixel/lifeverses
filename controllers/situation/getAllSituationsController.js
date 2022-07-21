// import Situation model
const Situation = require("../../models/Situation");

// fetch all situations controller
const getAllSituationsController = async (req, res) => {
  try {
    // fetch situations from dB
    let situations = await Situation.find().exec();

    // check if situations exist
    if (!situations) {
      return res.status(404).json({
        SituationsNotFoundError: "Situations does not exist",
      });
    }

    return res.status(200).json(situations);
  } catch (err) {
    return res.status.json(500).json({
      FetchAllError: "Error in fetching all situations: " + err?.message,
    });
  }
};

// export controller
module.exports = getAllSituationsController;
