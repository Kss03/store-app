import axios from "axios"
import { apiUrl } from "../currentUrl"

const getProducts = async (item) => {
  try {
    const response = await axios.get(`http://192.168.0.73:5000/api/v1/products`, {params: item})
    const {data} = await response
    return data.products
  } catch (error) {
    console.log(error)
  }
}

const getOneProduct = async (id) => {
  try {
    const response = await axios.get(`http://192.168.0.73:5000/api/v1/products/${id}`)
    const {data} = await response
    return data
  } catch (error) {
    console.log(error)
  }
}

export {getProducts, getOneProduct}