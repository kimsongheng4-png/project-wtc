import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Cart() {
  const { items, updateQty, removeFromCart, totalPrice } = useCart()
  const navigate = useNavigate()

  return (
    <section className="cart-page">
      <div className="page-header">
        <h1>Your Cart</h1>
      </div>

      <div className="cart-page-content">
        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/menu" className="cart-empty-link">Browse the Menu</Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.img} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                  </div>

                  <div className="cart-qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>

                  <div className="cart-item-total">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>

                  <button
                    className="cart-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total-row">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button className="cart-checkout" onClick={() => navigate('/payment')}>
                Go to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart
