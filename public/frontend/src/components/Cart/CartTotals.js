import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const CartTotals = ({count, orderCart}) => {

  const {isLogin} = useSelector((store) => store.login)

  const subtotal = count()
  const shipping = 5.34


  const loginButton = (
    <Link to='/login' state={{location: useLocation().pathname}}>
      <button className="btn cart-login w-100 cart-btn">Log In</button>
    </Link>
  )

  const submitButton = (
    <button className="btn cart-login cart-order cart-btn w-100" 
      onClick={(e) => {
        e.target.disabled = true
        orderCart()
      }}>Order</button>
  )

  const LoginOrderButton = isLogin ? submitButton : loginButton

  return (
    <div className="cart-totals row justify-content-between">
      <div className="col"></div>
      <div className="col-lg-5 col-12">
        <div className="  border border-3 rounded-4 mt-3 mb-3 px-5 py-4">
          <h5>Subtotal: <span>{subtotal}</span>$</h5>
          <p>Shipping fee: <span>{shipping}</span>$</p>

          <hr />

          <h4>Order total: <span>{subtotal + shipping}</span>$</h4>
        </div>
        {LoginOrderButton}

      </div>
    </div>
  )
}

export default CartTotals