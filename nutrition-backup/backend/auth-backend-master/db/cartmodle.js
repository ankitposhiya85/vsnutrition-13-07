// Assuming you have already installed and set up Mongoose

const mongoose = require('mongoose');

// Define the cart item schema
const cartItemSchema = new mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

// Define the cart schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
});

// Create the Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
