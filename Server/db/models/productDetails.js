const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  desc: {
    type: String,
    required: true,
    max: 200,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  other: {
    type: String,
  },
  images: [String],
});

//Create new collection
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
