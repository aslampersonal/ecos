const mongoose = require("mongoose");

const mongoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: String,
      required: false,
    },
  ],
  orders: [
    {
      _id: {
        type: String,
      },
      products: {
        type: Array,
      },
      payment: {
        type: Number,
      },
      orderDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("UserData", mongoSchema);