// import Situation model
const Situation = require("../../models/Situation");
const logger = require("../../logger/index");

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
        success: false,
        message: "Situation does not exist",
      });
    }

    // pass user-imputed fields into situationValues object
    const situationValues = { title, colour, icon };

    // update situation
    situation = await Situation.findOneAndUpdate(
      { _id: req.params.id },
      { $set: situationValues },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Situation updated successfully",
      data: situation,
    });
  } catch (err) {
    logger.error("Error occurred while updating situation: " + err?.message, {
      meta: update_situation,
    });
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating situation",
    });
  }
};

// export controller
module.exports = updateSituationController;
