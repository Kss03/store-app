import axios from "axios"

const remoteURL = 'https://ksprojects.pl/store-app/'
const url = 'http://192.168.0.73:5000/'

const getProducts = async (item) => {
  try {
    const response = await axios.get(`${remoteURL}api/v1/products`, {params: item})
    const {data} = response
    return data
  } catch (error) {
    console.log(error)
  }
}

const getOneProduct = async (id) => {
  try {
    const response = await axios.get(`${remoteURL}api/v1/products/${id}`)
    const {data} = response
    return data
  } catch (error) {
    console.log(error)
  }
}

export {getProducts, getOneProduct}