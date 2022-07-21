// import Situation model
const Situation = require("../../models/Situation");

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
        TitleExistsError: "Situation does not exist",
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

    return res.status(201).json(situation);
  } catch (err) {
    return res.status(500).json({
      SaveError:
        "Error occurred in while saving new situation: " + err?.message,
    });
  }
};

// export controller
module.exports = addSituationController;
