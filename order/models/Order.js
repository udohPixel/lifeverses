// import required modules
const mongoose = require("mongoose");
const validatorConfig = require("../../settings/validator.config");

// create schema object
const Schema = mongoose.Schema;

// create new instance of schema
const OrderSchema = new Schema(
  {
    userId: {
      type: String,
    },
    orderProducts: [
      {
        productId: {
          type: String,
        },
        title: {
          type: String,
        },
        price: {
          type: Number,
        },
        discount: {
          type: Number,
        },
        coverPic: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
      { timestamps: true },
    ],
    productsPrice: {
      type: Number,
      default: 0,
    },
    // vat: {
    //   type: Number,
    //   default: 0,
    // },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: [...validatorConfig.ORDER_STATUS_ARRAY],
      default: "Pending",
    },
    shippedAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
    shippingInfo: {
      contactName: {
        type: String,
      },
      streetAddress: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
        enum: [...validatorConfig.COUNTRY_ARRAY],
      },
      zipCode: {
        type: Number,
      },
      phoneNo: {
        type: String,
      },
    },
    paymentInfo: {
      paymentId: {
        type: String,
      },
      paymentStatus: {
        type: String,
        enum: [...validatorConfig.PAYMENT_STATUS_ARRAY],
        default: "Unpaid",
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

// export schema
module.exports = Order;
