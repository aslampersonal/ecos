const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productTitle: String,
    productId: Number,
    description: String,
    Price: Number,
    category: String,
    Images: Array
  });

  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;





