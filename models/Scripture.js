// import required libraries
const mongoose = require("mongoose");

// create schema object
const Schema = mongoose.Schema;

// create new instance of schema
const ScriptureSchema = new Schema(
  {
    userId: {
      type: String,
    },
    situationId: {
      type: String,
    },
    bibleVersion: {
      type: String,
      default: "NKJV",
      enum: ["NKJV"],
    },
    bibleTitle: {
      type: String,
      required: true,
      enum: {
        values: [
          "Genesis",
          "Exodus",
          "Leviticus",
          "Numbers",
          "Deuteronomy",
          "Joshua",
          "Judges",
          "Ruth",
          "1 Samuel",
          "2 Samuel",
          "1 Kings",
          "2 Kings",
          "1 Chronicles",
          "2 Chronicles",
          "Ezra",
          "Nehemiah",
          "Esther",
          "Job",
          "Psalms",
          "Proverbs",
          "Ecclesiastes",
          "Song of Solomon",
          "Isaiah",
          "Jeremiah",
          "Lamentations",
          "Ezekiel",
          "Daniel",
          "Hosea",
          "Joel",
          "Amos",
          "Obadiah",
          "Jonah",
          "Micah",
          "Nahum",
          "Habakkuk",
          "Zephaniah",
          "Haggai",
          "Zechariah",
          "Malachi",
          "Matthew",
          "Mark",
          "Luke",
          "John",
          "Acts",
          "Romans",
          "1 Corinthians",
          "2 Corinthians",
          "Galatians",
          "Ephesians",
          "Philippians",
          "Colossians",
          "1 Thessalonians",
          "2 Thessalonians",
          "1 Timothy",
          "2 Timothy",
          "Titus",
          "Philemon",
          "Hebrew",
          "James",
          "1 Peter",
          "2 Peter",
          "1 John",
          "2 John",
          "3 John",
          "Jude",
          "Revelation",
        ],
        message: "{VALUE} is not a valid bible title",
      },
    },
    bibleChapter: {
      type: Number,
      enum: [Array.from({ length: 119 }, (_, i) => i + 1)],
      required: true,
    },
    bibleVerses: {
      type: [Number],
      enum: [Array.from({ length: 176 }, (_, i) => i + 1)],
      required: true,
    },
  },
  { timestamps: true }
);

// export schema
module.exports = Scripture = mongoose.model("Scripture", ScriptureSchema);
