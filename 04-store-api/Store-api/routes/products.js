const express = require('express')

const { getAllProductsStatic,
    getAllproducts} = require('../controllers/products')

const router = express.Router()

router.route('/').get(getAllproducts)
router.route('/static').get(getAllProductsStatic)

module.exports = router