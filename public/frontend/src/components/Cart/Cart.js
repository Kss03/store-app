import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import MediaQuery from "react-responsive"

import { postOrderList } from "../../services/productServices"
import CartColumns from "./CartColumns"
import CartItems from "./CartItems"
import CartTotals from "./CartTotals"


const Cart = () => {

  const [cartData, setCartData] = useState([])
  const [isEmpty, setIsEmpty] = useState(true)
  const [isOrdered, setIsOrdered] = useState(false)

  const navigate = useNavigate()

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

  const displayNone = isOrdered ? "d-flex" : "d-none"

  const EmptyCart = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: '70vh'}}>
        <h2 className="mb-3">Your cart is empty</h2>
          <Link to='/products'>
            <button className="btn btn-dark cart-btn rounded-2">
              Continue Shopping
            </button>
          </Link>
      </div>
    )
  }

  const CartContainer = () => {

    return (
      <div className="cart-container pt-4 pt-lg-5">
        <h1>Cart</h1>

        <div className=" mb-3">
          <MediaQuery minWidth={991.98}>
            <CartColumns />
          </MediaQuery>
          <CartItems saveChanges={saveChanges} cartData={cartData}/>
        </div>
        <div className="cart-buttons d-flex justify-content-between flex-lg-row">
          <Link to='/products'>
            <button className="btn btn-dark cart-btn rounded-2">
              Continue Shopping
            </button>
          </Link>
          <button onClick={() => clearCart([])} className="btn btn-outline-dark cart-btn rounded-2">
            Clear
          </button>
        </div>
        <CartTotals orderCart={orderCart} count={cartTotalCounting}/>

        <OrderedMessage />

      </div>
    )
  }

  const OrderedMessage = () => {
    return (
      <div className={`position-fixed justify-content-center align-items-center ${displayNone}`} 
        style={{
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          backgroundColor: "rgba(0, 0, 0, .5)",
          zIndex: 1000,
        }}>
          <div className="p-5 bg-white">
            <h2>
              Your order is accepted
            </h2>
          </div>
      </div>
    )
  }

  const orderCart = () => {
    const submitItems = cartData.map(({_id}) => {
      return {_id: _id}
    })
    postOrderList(submitItems) 
      .then((res) => {
        if (res.status === 201) {
          localStorage.removeItem('cart')
          setIsOrdered(true)
          setTimeout(() => {
            navigate('/products')
          }, 2000)
        }
      })
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