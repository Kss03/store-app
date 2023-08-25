import { Link } from "react-router-dom"

import { getImages } from "../../services/getImages"

const CartItems = ({cartData, saveChanges}) => {

  
  const cartItems = cartData.map((item, index) => {
    return(
      <CartItem saveChanges={saveChanges} item={item} key={index}/>
    )
  })

  return (
    <>
      {cartItems}
    </>
  )

}

const CartItem = ({item, saveChanges}) => {
  
  const {name, price, amount, color, _id, images} = item

  const subtotalValue = Number(amount) * Number(price)

  const countPlus = () => {
    const newAmount = amount + 1
    saveAmount(newAmount)
  }

  const countMinus = () => {
    if (amount > 1) {
      const newAmount = amount - 1
      saveAmount(newAmount)
    }
    return 
  }

  const saveAmount = (newAmount) => {
    const oldCart = JSON.parse(localStorage.cart)
    const newCart = oldCart.map((item) => {
      if (item._id == _id) {
        item.amount = newAmount
      }
      return item
    })
    saveChanges(newCart)
  }

  const deleteProduct = () => {
    const oldCart = JSON.parse(localStorage.cart)
    const newCart = oldCart.filter((item) => item._id != _id)
    saveChanges(newCart)
  }

  const onImage = () => {
    const imageUrl = getImages(images)

    return (
      <Link to={`/products/${_id}`} className="link-reset d-inline-block">
        <img src={imageUrl[0]} className="card-img" alt="img" />
      </Link>
    )
  }

  const imageItems = onImage()

  return (
    <div className="cart-card">
      
      <div className="row">
        <div className=" col-12 col-lg-4 mb-3 mb-lg-0">
          <div className="d-flex flex-nowrap justify-content-start align-items-center">
            <div className="cart-image me-4">
              {imageItems}
            </div>
            <div>
              <h5>{name}</h5>
              <p className="m-0 d-flex align-items-center">
                <span className="me-2">Color:</span>
                <span className="p-2 rounded-circle d-inline-block" style={{backgroundColor: color}}></span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-3 col-lg-2">
          <div className="d-flex justify-content-center align-items-center h-100">
            <p className="text-center m-0 cart-price"><span className="me-1">{price}</span>$</p>
          </div>
        </div>
        <div className=" col-4 col-lg-2 ">
          <div className="d-flex w-100 justify-content-center align-items-center h-100">
            <button className="btn p-0 me-2 border-1" 
              style={{fontSize: 20}}
              onClick={() => countMinus()}>
              <i className="bi bi-dash-lg " ></i>
            </button>
            
            <span style={{fontSize: 30}} className="me-2 fw-bold">
              {amount}
            </span>

            <button className="btn p-0 me-2 border-1" 
              style={{fontSize: 20}}
              onClick={() => countPlus()}>
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>

        <div className="col-3 col-lg-2">
          <div className="d-flex justify-content-center align-items-center h-100 subtotal-price">
            <span className="me-1 ">{subtotalValue}</span>
            $
          </div>
        </div>

        <div className="col-2 col-lg-2">
          <div className="d-flex justify-content-end align-items-center h-100">
            <button className=" btn btn-danger py-1 px-2"
              onClick={() => deleteProduct()}>
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>
        </div>

      </div>
      <hr />
    </div>
  )
}

export default CartItems