const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	transactions: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Transaction'}] 
})
// increase the speed of quering email in the database
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)