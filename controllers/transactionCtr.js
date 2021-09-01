const Transaction = require('../models/Transaction')
const User = require('../models/user')
const mongoose = require('mongoose')

// @desc Get all transactions
//@route GET /api/v1/transactions
//@access Public
exports.getTransactions = async (req, res, next) => {
	const userId  = req.userData?.userId
	const googleId = req.userData?.googleId

	let userWithTransactions

	if (!googleId) {
		try {
			userWithTransactions = await User.findById(userId).populate(
				'transactions'
			)
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: 'Fetching transactions failed, please try again',
			})
		}

		if (!userWithTransactions) {
			return res.status(404).json({
				success: false,
				error: 'Could not find transactions with provided Id',
			})
		}
	}

	if (googleId) {
		try {
			userWithTransactions = await User.findOne({
				googleId: googleId,
			}).populate('transactions')
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: 'Fetching transactions failed, please try again',
			})
		}

		if (!userWithTransactions) {
			return res.status(404).json({
				success: false,
				error: 'Could not find transactions with provided Id',
			})
		}
	}

	res.json({
		data: userWithTransactions.transactions
			.map(transaction => transaction.toObject({ getters: true }))
			.reverse(),
		success: true,
		count: userWithTransactions.transactions.length,
		loading: false,
		Loading: false,
	})
}

// @desc Add transaction
//@route POST /api/v1/transactions
//@access Public
exports.addTransaction = async (req, res, next) => {
	const { name, amount, category, date } = req.body
	const googleId = req.userData?.googleId

	let createdTransaction

	let user
	if (!googleId) {
		createdTransaction = new Transaction({
			name: name,
			amount: amount,
			category: category,
			date: date,
			creator: req.userData.userId,
		})
		try {
			user = await User.findById(req.userData.userId)
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: 'create transaction failed',
			})
		}

		if (!user) {
			return res.status(500).json({
				success: false,
				error: 'could not find user with provided Id',
			})
		}
	}

	if (googleId) {
		try {
			user = await User.findOne({ googleId: googleId })
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: 'create transaction failed',
			})
		}

		if (!user) {
			return res.status(500).json({
				success: false,
				error: 'could not find user with provided Id',
			})
		}

		createdTransaction = new Transaction({
			name: name,
			amount: amount,
			category: category,
			date: date,
			creator: user._id,
		})
	}

	try {
		// check if all the operations work fine, otherwise roll back to the current database (making no changes)
		const sess = await mongoose.startSession() // define current session provided by mongooses
		sess.startTransaction() // note that transaction doesnt work when the collection doesnt exist
		await createdTransaction.save({ sesstion: sess })
		user.transactions.push(createdTransaction)
		await user.save({ sesstion: sess })
		await sess.commitTransaction()
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'create transaction failed, please try again',
		})
	}

	res.status(201).json({
		success: true,
		data: createdTransaction,
		loading: false,
		added: true,
	})
}

// @desc Delete transaction
//@route POST /api/v1/transactions/:id
//@access Public
exports.deleteTransaction = async (req, res, next) => {
	const transactionId = req.params.id
	const googleId = req.userData?.googleId

	let transaction

	try {
		// populate allows to refer to document sorted in another collection and to work with data in that existing document of that collection
		// to do so we need relation between 2 documents and we need to use ref in each of the collection to refer to the other ones
		// creator property contains user id, mongoose then take this id and search for entire data store in user document
		transaction = await Transaction.findById(transactionId).populate(
			'creator'
		)
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Could not delete the transaction',
		})
	}

	if (!transaction) {
		return res.status(404).json({
			success: false,
			error: 'No id match, Could not delete the transaction',
		})
	}

	if (googleId) {
		if (googleId !== transaction.creator.googleId) {
			return res.status(401).json({
				success: false,
				error: 'You are not allowed to delete this transaction',
			})
		}
	}

	if (!googleId) {
		if (transaction.creator.id !== req.userData.userId) {
			return res.status(401).json({
				success: false,
				error: 'You are not allowed to delete this transaction',
			})
		}
	}

	try {
		const sess = await mongoose.startSession()
		sess.startTransaction()
		await transaction.remove({ session: sess })
		transaction.creator.transactions.pull(transaction) // this will remove the id in the user collection
		await transaction.creator.save({ session: sess })
		await sess.commitTransaction()
	} catch (err) {
		return res.status(500).json({
			success: false,
			error:
				err.message ||
				'Something went wrong, could not delete the transaction',
		})
	}

	return res.status(200).json({
		success: true,
		data: {},
	})
}

exports.updateTransaction = async (req, res, next) => {
	const { name, amount, category, date } = req.body
	const transactionId = req.params.id
	const googleId = req.userData?.googleId

	let transaction
	try {
		transaction = await Transaction.findById(transactionId).populate(
			'creator'
		)
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Could not update the transaction',
		})
	}
	if (!googleId) {
		if (transaction.creator.id !== req.userData.userId) {
			return res.status(401).json({
				success: false,
				error: 'You are not allowed to delete this transaction',
			})
		}
	}
	if (googleId) {
		if (transaction.creator.googleId !== googleId) {
			return res.status(401).json({
				success: false,
				error: 'You are not allowed to delete this transaction',
			})
		}
	}

	transaction.name = name
	transaction.amount = amount
	transaction.category = category
	transaction.date = date

	try {
		await transaction.save()
	} catch (err) {
		return res.status(500).json({
			success: false,
			error:
				err.message ||
				'Something went wrong, could not delete the transaction',
		})
	}

	res.status(200).json({
		transaction: transaction.toObject({ getters: true }),
		success: true,
		loading: false,
		error: false,
	})
}
