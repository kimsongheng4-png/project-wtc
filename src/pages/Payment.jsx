import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import Receipt from '../components/Receipt.jsx'

const KHQR_BY_QTY = {
  1: { img: '/KHQR1.jpg', amount: 2.43 },
  2: { img: '/KHQR2.jpg', amount: 4.86 },
  3: { img: '/KHQR3.jpg', amount: 7.29 },
  4: { img: '/KHQR4.jpg', amount: 9.72 },
  5: { img: '/KHQR5.jpg', amount: 12.15 },
}

function generateOrderId() {
  const num = Math.floor(Math.random() * 99) + 1
  return 'TC-' + String(num).padStart(2, '0')
}

function Payment() {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [method, setMethod] = useState('card') // 'card' | 'qr'

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const completeOrder = (paymentMethod) => {
    setOrder({
      orderId: generateOrderId(),
      date: new Date().toLocaleString(),
      name: formData.name,
      address: formData.address,
      method: paymentMethod,
      items,
      total: totalPrice,
    })
    clearCart()
  }

  const handleCardSubmit = (e) => {
    e.preventDefault()
    completeOrder('card')
  }

  const handleQrConfirm = () => {
    completeOrder('qr')
  }

  if (order) {
    return (
      <section className="payment-page">
        <div className="page-header">
          <h1>Payment</h1>
        </div>

        <div className="payment-page-content">
          <div className="receipt-wrapper">
            <Receipt order={order} />

            <div className="receipt-actions">
              <button onClick={() => window.print()}>Print Receipt</button>
              <Link to="/menu" className="cart-empty-link">Back to Menu</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="payment-page">
        <div className="page-header">
          <h1>Payment</h1>
        </div>

        <div className="payment-page-content">
          <div className="payment-success">
            <h2>Nothing to Pay For</h2>
            <p>Your cart is empty.</p>
            <Link to="/menu" className="cart-empty-link">Browse the Menu</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="payment-page">
      <div className="page-header">
        <h1>Payment</h1>
      </div>

      <div className="payment-page-content">
        <div className="payment-layout">
          <div className="payment-form">
            <div className="payment-method-tabs">
              <button
                type="button"
                className={method === 'card' ? 'active' : ''}
                onClick={() => setMethod('card')}
              >
                Card
              </button>
              <button
                type="button"
                className={method === 'qr' ? 'active' : ''}
                onClick={() => setMethod('qr')}
              >
                Scan QR (KHQR)
              </button>
            </div>

            {method === 'card' ? (
              <form onSubmit={handleCardSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Delivery Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  inputMode="numeric"
                  maxLength={19}
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />

                <div className="payment-row">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={formData.expiry}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    inputMode="numeric"
                    maxLength={4}
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit">Pay ${totalPrice.toFixed(2)}</button>
              </form>
            ) : (
              <div className="qr-payment">
                {totalItems <= 5 ? (
                  <>
                    <p className="qr-instructions">
                      Scan this code with your banking app to pay ${KHQR_BY_QTY[totalItems].amount.toFixed(2)}
                    </p>
                    <img
                      src={KHQR_BY_QTY[totalItems].img}
                      alt={`Scan to pay ${KHQR_BY_QTY[totalItems].amount.toFixed(2)} with KHQR`}
                      className="qr-image"
                    />
                  </>
                ) : (
                  <>
                    <p className="qr-instructions">
                      KHQR codes are only available for orders of 1-5 items. Your cart has {totalItems} items —
                      please use Card payment, or remove some items to pay by QR.
                    </p>
                    <img
                      src={KHQR_BY_QTY[5].img}
                      alt="Scan to pay with KHQR"
                      className="qr-image"
                    />
                  </>
                )}
                <button type="button" onClick={handleQrConfirm}>
                  I've Paid
                </button>
              </div>
            )}
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>

            {items.map((item) => (
              <div className="order-summary-row" key={item.id}>
                <span>{item.name} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}

            <div className="order-summary-row order-summary-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="back-to-cart"
              onClick={() => navigate('/cart')}
            >
              ← Back to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Payment
