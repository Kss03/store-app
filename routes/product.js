const express = require('express');

const router = express.Router()

const {getAllProducts, createProduct, getOneProduct, orderProducts} = require('../controllers/products');

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getOneProduct)
router.route('/order').post(orderProducts)

module.exports = router;