

const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/CustomAPIError');

const login = async (req,res) => {
  const {username,email, password} = req.body;

  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400)
  }

  const id = new Date().getDate()

  const token = jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '30d'})

  res.status(200).json({msg: 'user created', username, token})
}

module.exports = login