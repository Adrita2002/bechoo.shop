const mongoose = require("mongoose");
// const validator = require("validator");

const paymentSchema = new mongoose.Schema({
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
  },
  razorpaySignature: {
    type: String,
    required: true,
  },
});
//Create new collection
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
