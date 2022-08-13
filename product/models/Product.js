// import required libraries
const mongoose = require("mongoose");

// create schema object
const Schema = mongoose.Schema;

// create new instance of schema
const ProductSchema = new Schema(
  {
    userId: {
      type: String,
    },
    format: {
      type: String,
      default: "Physical Book",
      enum: ["Physical Book", "eBook"],
    },
    title: {
      type: String,
      unique: true,
    },
    aboutAuthor: {
      type: String,
    },
    authors: {
      type: String,
    },
    pages: {
      type: Number,
    },
    publicationDate: {
      type: String,
    },
    isbn: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        "Devotional",
        "Christian Life",
        "Bible Study",
        "Ministry and Evangelism",
        "Music and Hymns",
        "History & Biography",
        "Christian Education",
        "Children Books",
        "Young Adult",
      ],
    },
    overview: {
      type: String,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    coverPic: {
      type: String,
    },
    previewPages: {
      type: String,
    },
    stock: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        reviewerId: {
          type: String,
        },
        reviewTitle: {
          type: String,
        },
        reviewRating: {
          type: Number,
          default: 0,
          enum: [0, 1, 2, 3, 4, 5],
        },
        comment: {
          type: String,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

// export schema
module.exports = Product;
