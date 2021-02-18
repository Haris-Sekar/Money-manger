const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        trim: true,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    newcategory: {
        type: String,
        trim: true,
        required: false
    },
})

module.exports = mongoose.model('Transaction', TransactionSchema)