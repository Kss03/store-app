import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MediaQuery from "react-responsive"

import CartColumns from "./CartColumns"
import CartItems from "./CartItems"
import CartTotals from "./CartTotals"


const Cart = () => {

  const [cartData, setCartData] = useState()

  useEffect(() => {
    onGetCart()
  }, [])

  const onGetCart = () => {
    try {
      const data = JSON.parse(localStorage.cart)
      setCartData(data)
    } catch (error) {
      setCartData()
    }
  }

  const clearCart = () => {
    setCartData()
    localStorage.removeItem('cart')
  }

  const saveChanges = (item) => {
    setCartData(item)
    localStorage.cart = JSON.stringify(item)
  }

  const cartTotalCounting = () => {
    let count = 0;
    if (cartData) {
      cartData.forEach((item) => {
        count = count + (Number(item.price) * Number(item.amount))
      })
    }
    return count
  }


  const isEmptyItems = cartData ? <CartItems saveChanges={saveChanges} cartData={cartData}/> : false

  return (
    <section className="cart-section">
      <div className="container">
        <div className="cart-container">
          <h1>Cart</h1>

          <div className=" mb-3">
            <MediaQuery minWidth={991.98}>
              <CartColumns />
            </MediaQuery>
            {isEmptyItems}
          </div>
          <div className="cart-buttons d-flex justify-content-between flex-lg-row">
            <Link to='/products'>
              <button className="btn btn-dark">
                Continue Shopping
              </button>
            </Link>
            <button onClick={() => clearCart()} className="btn btn-outline-dark">
              Clear
            </button>
          </div>

          <CartTotals count={cartTotalCounting}/>



        </div>
      </div>
    </section>
  )
}

export default Cart