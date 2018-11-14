// Mongoose model for E-commerce project
// Group: 
// Author: 

const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    orderID: {
        type: Number,
        required: true,
        unique: true,
        default: 777
    },
    email: {
        type: String,
        required: true
    },
    datePlaced: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateShipped: {
        type: Date,
        required: false
    },
    paymentType: {
        type: String,
        enum: ['no selection', 'credit card', 'cash', 'check'],
        required: true,
        default: 'no selection'
    },
    
})
module.exports = mongoose.model('Order', OrderSchema)