// import required libraries
const mongoose = require("mongoose");

// create schema object
const Schema = mongoose.Schema;

// create new instance of schema
const SituationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    colour: {
      type: String,
      required: true,
      enum: [
        "bg-orange-1 color-orange",
        "bg-red-1 color-red",
        "bg-pink-1 color-pink",
        "bg-purple-1 color-purple",
        "bg-yellow-1 color-yellow",
        "bg-blue-1 color-blue",
        "bg-snow text-dark",
        "bg-green-1 color-green",
        "bg-cyan-1 color-cyan",
      ],
    },
    icon: {
      type: String,
      required: true,
    },
    scriptures: [
      {
        userId: {
          type: String,
        },
        scriptureId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

// export schema
module.exports = Situation = mongoose.model("Situation", SituationSchema);
