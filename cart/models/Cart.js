// import required modules
const mongoose = require("mongoose");

// create schema object
const Schema = mongoose.Schema;

// create new instance of schema
const CartSchema = new Schema(
  {
    userId: {
      type: String,
    },
    productId: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

// export schema
module.exports = Cart;
