const express = require('express');

const router = express.Router()

const {getAllProducts, createProduct, getOneProduct, orderProducts, getImage} = require('../controllers/products');

router.route('/').get(getAllProducts)
router.route('/:id').get(getOneProduct)
router.route('/order').post(orderProducts)
router.route('/create').post(createProduct)
router.route('/get-image').get(getImage)

module.exports = router;