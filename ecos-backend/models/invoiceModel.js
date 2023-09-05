const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        default: true,
        unique: true
    },
    invoiceDate: Date,
    customerName: {
        type: String,
        default: true
    },
    address: String,
    city: String,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: Number,
    totalPrice: Number
  });

  const Invoice = mongoose.model('Invoice', invoiceSchema);

  module.exports = Invoice;

