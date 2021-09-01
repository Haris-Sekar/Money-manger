const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
	const { name, email, password } = req.body
	let existingUser
	try {
		existingUser = await User.findOne({ email: email })
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Signing up failed, please try again later.',
		})
	}
	if (existingUser) {
		return res.status(422).json({
			success: false,
			error: 'User exists already, please login instead.',
		})
	}
	let hashedPassword
	try {
		hashedPassword = await bcrypt.hash(password, 12)
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Could not create user, plese try again',
		})
	}
	const createdUser = new User({
		name,
		email,
		password: hashedPassword,
		transactions: [],
	})

	try {
		await createdUser.save()
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Signing up failed, please try again later.',
		})
	}

	let token
	try {
		token = jwt.sign(
			{ userId: createdUser.id, email: createdUser.email },
			process.env.JWT_KEY,
			{ expiresIn: '1h' }
		)
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Signing up failed, please try again later.',
		})
	}
	res.status(201).json({
		userId: createdUser.id,
		email: createdUser.email,
		token: token,
	})
}

exports.signin = async (req, res) => {
	const { email, password } = req.body

	let existingUser

	try {
		existingUser = await User.findOne({ email: email })
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Signing up failed, please try again later.',
		})
	}

	if (!existingUser) {
		return res.status(403).json({
			success: false,
			error: 'Invalid credentials, could not log you in.',
		})
	}

	let isValidPassword
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password)
	} catch (err) {
		return res.status(403).json({
			success: false,
			error: 'Invalid credentials, could not log you in.',
		})
	}

	if (!isValidPassword) {
		return res.status(403).json({
			success: false,
			error: 'Invalid credentials, could not log you in.',
		})
	}

	let token
	try {
		token = jwt.sign(
			{ userId: existingUser.id, email: existingUser.email },
			process.env.JWT_KEY,
			{ expiresIn: '1h' }
		)
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'error, could not log you in.',
		})
	}

	res.json({
		userId: existingUser.id,
		email: existingUser.email,
		token: token,
		name: existingUser.name,
	})
}
