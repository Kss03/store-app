const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided']
  },
  category: {
    type: String,
    enum: {
      values: ['office', 'living room', 'kitchen', 'bedroom', 'dining', 'kids'],
      message: '{VALUE}'
    }
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  about: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    enum: {
      values: ['red', 'green', 'blue', 'yellow', 'black', "white"],
      message: '{VALUE}'
    }
  },
  brand: {
    type: String,
    enum: {
      values: ['liddy', 'ikea', 'jysk'],
      message: '{VALUE}'
    }
  }
})

module.exports = mongoose.model('Product', productSchema)

