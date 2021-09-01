const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
	name: { type: String },
	email: { type: String },
	password: { type: String },
	transactions: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Transaction',
			default: [],
		},
	],
	googleId: { type: String },
})

// increase the speed of quering email in the database
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
