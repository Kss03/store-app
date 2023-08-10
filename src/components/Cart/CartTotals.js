

const CartTotals = ({count}) => {

  const subtotal = count()
  const shipping = 5.34

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

        <button className="btn cart-login w-100">LOGIN</button>

      </div>
    </div>
  )
}

export default CartTotals