import ProductCard from '../components/ProductCard.jsx'
import { menuProducts } from '../data/products.js'

function Menu() {
  return (
    <>
      <section className="menu-header">
        <h1>Our Coffee Menu</h1>
      </section>

      <section className="menu-container">
        {menuProducts.map((product) => (
          <ProductCard key={product.id} product={product} variant="menu" />
        ))}
      </section>
    </>
  )
}

export default Menu
