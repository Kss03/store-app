const Product = require('../models/product');

const getOneProduct = async (req, res) => {
  const {id} = req.params

  const product = await Product.findOne({_id: id})

  res.status(200).json(product)
}

const getAllProducts = async (req, res) => {
  const {name, category, priceRange, createdAt, available, color, brand} = req.query;

  let reqQuery = {}

  if (name) {
    reqQuery.name = {$regex: name, $options: 'i'}
  }

  if (category) {
    reqQuery.category = {$regex: category, $options: 'i'}
  }

  if (priceRange) {
    const range = priceRange.split(',').map(item => Number(item));
    reqQuery.price = {
      $gt: range[0],
      $lt: range[1]
    }
  }

  if (available) {
    reqQuery.available = available
  }

  if (color) {
    reqQuery.color = color
  }

  if (brand) {
    reqQuery.brand = {$regex: brand, $options: 'i'}
  }

  const products = await Product.find(reqQuery)


  res.status(200).json({products, arrLength: products.length})
}

const createProduct = async (req,res) => {
  console.log(req.body)

  await Product.create(req.body)
  res.status(201).json({msg: req.body})
}

const orderProducts = async (req, res) => {
  res.status(201).json({msg: 'order accepted for processing'})
}

module.exports = {getOneProduct, getAllProducts, createProduct, orderProducts}