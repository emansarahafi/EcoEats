const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qte: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
