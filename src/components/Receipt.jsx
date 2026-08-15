function Receipt({ order }) {
  const { orderId, date, name, address, method, items, total } = order

  return (
    <div className="receipt">
      <div className="receipt-brand">Toto Coffee</div>
      <p className="receipt-sub">Order Receipt</p>

      <div className="receipt-meta">
        <div>
          <span>Order #</span>
          <span>{orderId}</span>
        </div>
        <div>
          <span>Date</span>
          <span>{date}</span>
        </div>
        {name && (
          <div>
            <span>Name</span>
            <span>{name}</span>
          </div>
        )}
        {address && (
          <div>
            <span>Address</span>
            <span>{address}</span>
          </div>
        )}
        <div>
          <span>Payment</span>
          <span>{method === 'qr' ? 'KHQR' : 'Card'}</span>
        </div>
      </div>

      <div className="receipt-divider"></div>

      <div className="receipt-items">
        {items.map((item) => (
          <div className="receipt-item" key={item.id}>
            <span>{item.name} × {item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="receipt-divider"></div>

      <div className="receipt-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <p className="receipt-thanks">Thank you for your order! ☕</p>
    </div>
  )
}

export default Receipt
