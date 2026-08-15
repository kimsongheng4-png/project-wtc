import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

function ProductCard({ product, variant = 'home' }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="card">
      <img src={product.img} alt={product.name} />

      {variant === 'home' ? (
        <>
          <h3>{product.name}</h3>
          <div className="price">${product.price.toFixed(2)}</div>
        </>
      ) : (
        <>
          <h2>{product.name}</h2>
          <span>${product.price.toFixed(2)}</span>
        </>
      )}

      <button onClick={handleAddToCart} className={added ? 'added' : ''}>
        {added ? 'Added ✓' : 'Add to Cart'}
      </button>
    </div>
  )
}

export default ProductCard
