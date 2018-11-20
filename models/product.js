const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

  _id: { type: Number, required: true },
  productKey: {
    type: String,
    required: true,
    unique: true,
    default: 'product'
  },
  description: {
    type: String,
    required: false,
    default: 'description'
  },
  unitPrice: {
    type: Number,
    required: true,
    default: 9.99,
    min: 0,
    max: 100000
  },
  MFD:
  {
    type: String,
    required: true,
    default: "11/13/2018"
  },
  EXD:
  {
    type: String,
    required: true,
    default: "Best before 2 months from MFD"
  }

})
module.exports = mongoose.model('Product', ProductSchema)
