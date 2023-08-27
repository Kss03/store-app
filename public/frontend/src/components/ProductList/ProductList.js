import { Link } from "react-router-dom";
import { getImages } from "../../services/getImages";


const ProductList = ({data, cardType}) => {

  const cardArr = cardType === "grid" ? data.map((item, index) => <ProductCardGrid item={item} key={index}/>) :
    data.map((item, index) => <ProductCardList item={item} key={index}/>)

  return (
    <>
      <div className="product-list row  g-3 gx-xxl-4 gy-xxl-3 pt-3 pt-lg-0">
        {cardArr}
      </div>
    </>
  )
}



const ProductCardList = ({item}) => {

    let {name, price, about, _id, images} = item

    const onImage = () => {
      const imageUrl = getImages(images)

      return (
        <Link to={`/products/${_id}`}>
          <img src={imageUrl[0]} className="card-img" alt="img" />
        </Link>
      )
    }

    const imageItems = onImage()
    
    if (about) {
      if (about.length > 150) {
        about = `${about.slice(0, 170)}...`;
      }
    }

    return (
      <Link to={`/products/${_id}`} className=" text-decoration-none">
        <div className=" col-lg-12 col-12 product-card-list mx-0 mx-lg-0 my-1 my-lg-2">
          <div className=" row gx-0 align-items-center">
            <div className="col-12 col-lg-4 col-xl-3 card-image mb-3 mb-lg-0">
              {imageItems}
            </div>
            <div className="col-12 col-lg-8 col-xl-8 px-2 px-lg-4 py-2 py-lg-0 card-items">
              <div className="d-flex flex-column justify-content-start h-100">
                <h5 className="card-title mb-3">{name}</h5>
                <p className="mb-2 card-price">$&nbsp;{price}</p>
                <p className="mb-2 card-descr">{about}</p>
              </div>

            </div>
          </div>
        </div>
      </Link>
      
    )

}
const ProductCardGrid = ({item}) => {

    let {name, price, brand, about, _id, images} = item

    const onImage = () => {
      const imageUrl = getImages(images)

      return (
        <img src={imageUrl[0]} className="card-img" alt="img" />
      )
    }

    const imageItems = onImage()
    
    if (about) {
      if (about.length > 150) {
        about = `${about.slice(0, 170)}...`;
      }
    }

    return (
      
        <div className=" col-lg-4 col-12">
          <div className="product-card-grid h-100">
            <Link to={`/products/${_id}`} className=" text-decoration-none text-reset">
              <div className=" row gx-0">
                <div className="col-12 card-image mb-3 mb-lg-0">
                  {imageItems}
                </div>
                <div className="col-12 px-2 px-lg-2 py-2 py-lg-2 pt-lg-4 card-items ">
                  <h5 className="card-title mb-3 pb-2 border-bottom text-center">{name}</h5>
                  <div className="d-flex  justify-content-between">
                    <p className=" card-descr">{brand}</p>
                    <p className=" card-price">$&nbsp;{price}</p>
                  </div>

                </div>
              </div>
            </Link>
          </div>
        </div>
    )

}



export default ProductList