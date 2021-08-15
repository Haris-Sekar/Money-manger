const express = require('express')
const router = express.Router()
const { signin, signup,  } = require('../controllers/userCtr')

router
    .route('/')
    .get(async (req, res) => {
        try {
           return res.send('users route')

        } catch(error) {
            res.status(500).send(error.message || 'an error happened')
        }
    })
router
    .route('/signin')
    .post(signin)
router
    .route('/signup')
    .post(signup)

module.exports = router