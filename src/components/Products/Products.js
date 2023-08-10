import axios from "axios"
import { useState, useEffect } from "react"

import ProductList from "../ProductList/ProductList"
import FilterBar from "../FilterBar/FilterBar"
import {getProducts} from "../../services/productServices"

const Products = () => {

  const [productsData, setProductsData] = useState();

  useEffect(() => {
    onGetProducts()
  }, [])

  const onGetProducts = async (filterObj) => {
    try {
      getProducts(filterObj)
        .then((data) => setProductsData(data))
        .catch((err) => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="product-section pt-1 pt-lg-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-xxl-2 col-12">
            <FilterBar onGetProducts={onGetProducts}/>
          </div>
          <div className="col-lg-9 col-xxl-10 col-12">
            <ProductList  data={productsData}/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products