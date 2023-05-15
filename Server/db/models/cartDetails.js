const mongoose = require("mongoose");
const validator = require("validator");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  productId: {
    type: String,
    required: true,
    ref: "Product",
  },
});
//Create new collection
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
