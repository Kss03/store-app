require('dotenv').config()
require('express-async-errors');

const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())

const connectDB = require('./db/connect');
const productRouter = require('./routes/product');

app.use(express.json())

app.use('/api/v1', productRouter)

app.use('/', express.static(__dirname + '/public/client'))
app.use('/*', express.static(__dirname + '/public/client'))


const port = process.env.PORT || 5000;

const start = async (port) => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`server is listening on the port: ${port}`))
  } catch(error) {
    console.log(error)
  }
}

start(port)