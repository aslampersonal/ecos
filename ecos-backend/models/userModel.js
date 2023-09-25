const mongoose = require("mongoose");

const mongoSchema = new mongoose.Schema({
  username: {
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
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productDatas",
      },
      orderId: {
        type: String,
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