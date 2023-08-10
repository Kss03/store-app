import { Link } from "react-router-dom";
import { useState } from "react";

const ProductList = ({data}) => {

  const [sortBy, setSortBy] = useState(null)

  const cardArr = data ? productCard(data) : 'Loading';



  return (
    <>

      <div className="sort-products d-flex  justify-content-around align-items-center ms-lg-auto mb-2 py-1 py-lg-2 px-2 px-lg-2 overflow-hidden">
        <span>Sort&nbsp;By: </span>
        <select name="sorting" id="sorting" className=" selectbar border-0" onChange={(e) => setSortBy(e.target.value)}>
          <option className="selectbar-option" value='price-lowest'>
            Price (Lowest)
          </option>
          <option className="selectbar-option" value='price-highest'>
            Price (Highest)
          </option>
          <option className="selectbar-option" value='a-z'>
            Name (A-Z)
          </option>
          <option className="selectbar-option" value='z-a'>
            Name (Z-A)
          </option>
        </select>
      </div>
      <div className="product-list row">
        {cardArr}
      </div>
    </>
  )
}

const productCard = (data) => {
  return data.map((item) => {
    let {name, price, category, createdAt, color, brand, about, _id} = item

    if (about) {
      if (about.length > 150) {
        about = `${about.slice(0, 170)}...`;
      }
    }

    return (
      <div className=" col-lg-12 col-12 product-card mx-0 mx-lg-2 my-1 my-lg-2 border shadow bg-white">
        <div className=" row gx-0">
          <div className="col-12 col-lg-4 card-image mb-3 mb-lg-0">
            <Link to={`/products/${_id}`}>
              <img src="https://picsum.photos/1920/1080" className="card-img" alt="img" />
            </Link>

          </div>
          <div className="col-12 col-lg-8 px-2 px-lg-4 py-1 ">
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
  })
}

export default ProductList