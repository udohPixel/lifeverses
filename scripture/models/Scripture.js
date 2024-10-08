// import required libraries
const mongoose = require("mongoose");
const validatorConfig = require("../../settings/validator.config");

// create schema object
const Schema = mongoose.Schema;

// create new instance of schema
const ScriptureSchema = new Schema(
  {
    userId: {
      type: String,
    },
    slug: {
      type: String,
      index: true,
    },
    situationId: {
      type: String,
      index: true,
    },
    bibleVersion: {
      type: String,
      default: "NKJV",
      enum: ["NKJV"],
    },
    bibleTitle: {
      type: String,
      required: true,
      enum: [...validatorConfig.BIBLE_TITLE_ARRAY],
    },
    bibleChapter: {
      type: Number,
      enum: [Array.from({ length: 119 }, (_, i) => i + 1)],
    },
    bibleVerses: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Scripture = mongoose.model("Scripture", ScriptureSchema);

// export schema
module.exports = Scripture;
