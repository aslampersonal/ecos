const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    expiryDate: Date,
    batchNumber: Number,
    supplierName: String,
    quantity: Number,
    totalPrice: Number
  });

  const Stocks = mongoose.model('Stocks', inventorySchema);

  module.exports = Stocks;





