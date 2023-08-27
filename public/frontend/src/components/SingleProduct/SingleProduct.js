
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

import { getOneProduct } from "../../services/productServices"
import Loading from "../Loading/Loading"
import SwiperProductPage from "../swiper-product-page/swiper-product-page"
import { getImages } from "../../services/getImages"

const SingleProduct = () => {

  //datas
  const [prodData, setProdData] = useState({})
  //products amount
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const {id} = useParams()

  useEffect(() => {
    onGetData(id)
  }, [])

  const onGetData = (id) => {
    try {
      getOneProduct(id)
        .then((response) => {
          setProdData(response);
          setIsLoading(false);
        })
        .catch((reject) => console.log(reject))
    } catch (error) {
      console.log(error)
    }
  }

  const countPlus = () => {
    return setAmount(amount + 1)
  }

  const countMinus = () => {
    if (amount > 1) {
      return setAmount(amount - 1)
    }
    return 
  }


  const addToCart = () => {

    const data = {...prodData, amount: amount}
    if (!localStorage.cart) {
      localStorage.setItem('cart', JSON.stringify([data]))
      return
    }
    const oldCart = JSON.parse(localStorage.cart)
    //if exist
    
    const ifExist = oldCart.find((item) => item._id === data._id)
    if (ifExist) {
      const newCart = oldCart.map((item) => {
        if (item._id === data._id) {
          return data
        }
        return item
      })
      return localStorage.cart = JSON.stringify([...newCart])
    }

    localStorage.cart = JSON.stringify([...oldCart, data])
  }



  const ProductBlock = () => {
    const {about, available, brand, category, color, name, price, images} = prodData

    //sprawdza czy product jest dostępny
    const isAvailable = !available ? {disable: true, text: 'Product not available'} : {disable: false, text: 'Add to card'}
  
    const imagesArr = getImages(images)

    return (
      <div className="product-block">
        <div className="row ">
          <div className="slider col-12 col-lg-7 mb-3 mb-lg-0">
            <SwiperProductPage imagesArr={imagesArr} />
          </div>
          <div className="col-12 col-lg-5 ps-4 pb-3 ps-lg-4">
            <h2>{name}</h2>
            <p className="block-text m-0 mb-1">
              <span className=" block-subtitle me-2">SKU:</span> 
              {id}
            </p>
            <p className="block-text m-0 mb-1">
              <span className="block-subtitle me-2">Price:</span> 
              {price}$
            </p>

            <p className="block-text m-0 mb-1">
              {about}
            </p>
            <p className="block-text m-0 mb-1">
              <span className="me-2 block-subtitle">
                Available:
              </span>
              <span>
                {available ? 'Yes' : 'No'}
              </span>
            </p>
            <p className="block-text m-0 mb-1">
              <span className="me-2 block-subtitle">
                Category: 
              </span>
              <span className=''>
                {category}
              </span>
            </p>
            <p className="block-text m-0 mb-4">
              <span className="me-2 block-subtitle">
                Brand: 
              </span>
              <span className='text-uppercase'>
                {brand}
              </span>
            </p>
            <div className="w-100 border-bottom mb-4"></div>
            <div className="d-flex align-items-center">
              <span className="block-subtitle me-3">
                Color: 
              </span>
              <div className=" border border-1 rounded-circle p-2 d-inline-block" style={{backgroundColor: color}}></div>
            </div>

            <div className="amount d-flex w-auto justify-content-start align-items-center mb-3">
              <button className="btn p-0 me-2 border-1" 
                style={{fontSize: 25}}
                onClick={() => countMinus()}>
                <i className="bi bi-dash-lg " ></i>
              </button>
              
              <span className="me-2">
                {amount}
              </span>

              <button className="btn p-0 me-2 border-1" 
                style={{fontSize: 25}}
                onClick={() => countPlus()}>
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>

            <button disabled={isAvailable.disable} className="btn text-uppercase add-btn" onClick={() => addToCart()}>
              <span className="me-2">{isAvailable.text}</span>
              <i className="bi bi-plus-lg"></i>
            </button>

          </div>
        </div>
      </div>
    )
  }

  const product = !isLoading ? ProductBlock() : null;
  const loading = isLoading  ? <Loading /> : null;
  
  return (
    <section className="single-product pt-4 pt-lg-5 pb-3 pb-lg-4">
      <div className="container">
        <div className="back-button mb-3 mb-lg-3">

          <Link to='/products' className="">
            <button className="btn btn-outline-dark text-uppercase">
              Back to products
            </button>
          </Link>
        </div>
        <div>
          {product}
          {loading}
        </div>

      </div>
    </section>
  )
}

export default SingleProduct