const express = require('express')
const router = express.Router()

const {login , dashboard} = require('../controllers/main')

const authMiddlerware = require('../middleware/auth')

router.route('/dashboard').get(authMiddlerware,dashboard)

router.route('/login').post(login)

module.exports = router
