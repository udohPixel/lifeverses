// import Situation model
const Situation = require("../../models/Situation");
const logger = require("../../logger/index");

// add situation controller
const addSituationController = async (req, res) => {
  try {
    // object destructuring assignment
    const { title, colour, icon } = req.body;

    // fetch situation by title from dB
    let situation = await Situation.findOne({ title }).exec();

    // check if situation exists
    if (situation) {
      return res.status(404).json({
        success: false,
        message: "Situation does not exist",
      });
    }

    // create a new instance of Situation to store the user-imputed values
    const newSituation = new Situation({
      title,
      colour,
      icon,
    });

    // save new situation to dB
    situation = await newSituation.save();

    return res.status(201).json({
      success: true,
      message: "Situation saved successfully",
      data: situation,
    });
  } catch (err) {
    logger.error("Error occurred while saving situation: " + err?.message, {
      meta: add_situation,
    });
    return res.status(500).json({
      success: false,
      message: "Something went wrong while saving new situation",
    });
  }
};

// export controller
module.exports = addSituationController;
