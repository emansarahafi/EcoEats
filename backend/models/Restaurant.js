const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  rating: Number,
  price: Number,
  qte: Number,
  image: String,
  availability: Boolean,
});

const restaurantSchema = new Schema({
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
  logo: {
    type: String,
    required: true,
  },
  foundingDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  products: [productSchema],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
