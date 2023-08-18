import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorBoundary from "../Error/Error";


const ProductList = ({data}) => {

 const cardArr = data.map((item, index) => <ProductCard item={item} key={index}/>)

  return (
    <>
      <div className="product-list row">
        {cardArr}
      </div>
    </>
  )
}



const ProductCard = ({item}) => {

    let {name, price, category, createdAt, color, brand, about, _id} = item
    
    if (about) {
      if (about.length > 150) {
        about = `${about.slice(0, 170)}...`;
      }
    }

    return (
      <div className=" col-lg-12 col-12 product-card mx-0 mx-lg-0 my-1 my-lg-2 border shadow bg-white">
        <div className=" row gx-0">
          <div className="col-12 col-lg-4 card-image mb-3 mb-lg-0">
            <Link to={`/products/${_id}`}>
              <img src="https://picsum.photos/1920/1080" className="card-img" alt="img" />
            </Link>

          </div>
          <div className="col-12 col-lg-8 px-2 px-lg-4 py-2 py-lg-4 card-items">
            <h5 className="card-title mb-3">{name}</h5>
            <p className="mb-2 card-price">$&nbsp;{price}</p>
            <p className="mb-2 card-descr">{about}</p>
            
            <Link to={`/products/${_id}`}>
              <button className="btn btn-moreinfo">DETAILS</button>
            </Link>

          </div>
        </div>
      </div>
    )

}



export default ProductList