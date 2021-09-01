const jwt = require('jsonwebtoken')
const User = require('../models/User')
const mongoose = require('mongoose')

module.exports = async (req, res, next) => {
	// ensure the request is not blocked by OPTIONS:
	if (req.method === 'OPTIONS') {
		return next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		const isCustomAuth = token.length < 500
		let decodedToken
		if (!token) {
			throw new Error('Authentication failed')
		}
		if (token && isCustomAuth) {
			decodedToken = jwt.verify(token, process.env.JWT_KEY)
			// add data to the request:
			req.userData = { userId: decodedToken.userId }
			// allow to reach to below routers
		}
		if (token && !isCustomAuth) {
			//google auth:
			decodedToken = jwt.decode(token)
			req.userData = {
				googleId: decodedToken?.sub,
			}

			let userWithTransactions
			try {
				userWithTransactions = await User.findOne({
					googleId: decodedToken?.sub,
				}).populate('transactions')
			} catch (err) {
				console.log(err)
			}
			if (!userWithTransactions) {
				const createdUser = new User({
					googleId: decodedToken?.sub,
					email: decodedToken?.email + 'bygoogle',
					name: decodedToken?.name,
				})

				try {
					await createdUser.save()
				} catch (err) {
					return res.status(500).json({
						success: false,
						error: 'Something went wrong',
					})
				}
			}
		}
		next()
	} catch (err) {
		return res.status(403).json({
			success: false,
			error: 'authentication failed!',
		})
	}
}
