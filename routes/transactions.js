const express = require('express')
const router = express.Router()
const { getTransactions, addTransaction, deleteTransaction, updateTransaction } = require('../controllers/transactionCtr')
const checkAuth = require('../middleware/check-auth')

router.use(checkAuth)

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction)

router
    .route('/:id')
    .delete(deleteTransaction)
    .put(updateTransaction)

module.exports = router