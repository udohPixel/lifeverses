// import required modules
const mongoose = require("mongoose");
const validatorConfig = require("../../settings/validator.config");

// create schema object
const Schema = mongoose.Schema;

// create new instance of schema
const SituationSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    colour: {
      type: String,
      enum: [...validatorConfig.SITUATION_COLOUR_ARRAY],
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

const Situation = mongoose.model("Situation", SituationSchema);

// export schema
module.exports = Situation;
