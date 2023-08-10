const express = require('express');

const router = express.Router()

const {getAllProducts, createProduct, getOneProduct} = require('../controllers/products');

router.route('/products').get(getAllProducts).post(createProduct)
router.route('/products/:id').get(getOneProduct)

module.exports = router;