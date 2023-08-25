const Product = require('../models/product');
const path = require('path')

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
  // console.log(req.body)
  // console.log('files: ', req.files)
  // console.log("startt")
  console.log("aut", req.files)

  let imagesPath = []

  if (req.files) {
    const {'images[]': images} = req.files

    
    if (Array.isArray(images)) {
      console.log('array', images)
      images.forEach((imageItem) => {
  
        console.log('array', imageItem.name)
        const imagePath = path.join(__dirname, '../public/uploads/images/' + `${imageItem.name}`)
        imagesPath.push(imageItem.name)
        console.log('eee', imagePath)
    
        imageItem.mv(imagePath)
      })
    } else {
      const imagePath = path.join(__dirname, '../public/uploads/images/' + `${images.name}`)
      imagesPath.push(images.name)
      images.mv(imagePath)
    }
  }

  

  console.log("tut", String(imagesPath))

  const body = {...req.body, images: imagesPath}
  // console.log("tut1,5", body)

  const responseDB = await Product.create(body)
  // console.log(responseDB)
  // console.log("tut 2")

  res.status(200).json({msg: "uploaded"})
}

const orderProducts = async (req, res) => {
  res.status(201).json({msg: 'order accepted for processing'})
}

const getImage = async (req, res) => {
  console.log(req.params.name)
  // res.sendFile(path.join(__dirname, '../public/uploads/images/' + `${req.params.name}`))
  res.status(200).json({msg: 'eee'})
}

module.exports = {getOneProduct, getAllProducts, createProduct, orderProducts, getImage}