const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
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
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Transaction', transactionSchema)