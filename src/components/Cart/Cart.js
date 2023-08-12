import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MediaQuery from "react-responsive"

import CartColumns from "./CartColumns"
import CartItems from "./CartItems"
import CartTotals from "./CartTotals"


const Cart = () => {

  const [cartData, setCartData] = useState([])
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    onGetCart()
  }, [])

  useEffect(() => {
    isEmptyCheck()
  }, [cartData])

  const onGetCart = () => {
    try {
      const data = JSON.parse(localStorage.cart)
      setCartData(data)
    } catch (error) {
      setCartData([])
    }
  }

  const clearCart = () => {
    setCartData([])
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

  const isEmptyCheck = () => {
    if (cartData.length < 1) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }

  const EmptyCart = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: '70vh'}}>
        <h2 className="mb-3">Your cart is empty</h2>
          <Link to='/products'>
            <button className="btn btn-dark">
              Continue Shopping
            </button>
          </Link>
      </div>
    )
  }

  const CartContainer = () => {

    return (
      <div className="cart-container">
        <h1>Cart</h1>

        <div className=" mb-3">
          <MediaQuery minWidth={991.98}>
            <CartColumns />
          </MediaQuery>
          <CartItems saveChanges={saveChanges} cartData={cartData}/>
        </div>
        <div className="cart-buttons d-flex justify-content-between flex-lg-row">
          <Link to='/products'>
            <button className="btn btn-dark">
              Continue Shopping
            </button>
          </Link>
          <button onClick={() => clearCart([])} className="btn btn-outline-dark">
            Clear
          </button>
        </div>

        <CartTotals count={cartTotalCounting}/>
      </div>
    )
  }

  const items = !isEmpty ? <CartContainer /> : null
  const emptyCart = isEmpty ? <EmptyCart /> : null

  return (
    <section className="cart-section">
      <div className="container">
        {items}
        {emptyCart}
      </div>
    </section>
  )
}

export default Cart