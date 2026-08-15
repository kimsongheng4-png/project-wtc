import ProductCard from '../components/ProductCard.jsx'
import { homeProducts, categories } from '../data/products.js'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>ORDER COFFEE</h1>
          <p>Fresh coffee everyday</p>
        </div>
      </section>

      <section className="menu">
        <div className="menu-top">
          <h2>Best Menu</h2>
        </div>

        <div className="categories">
          {categories.map((cat) => (
            <button key={cat}>{cat}</button>
          ))}
        </div>

        <div className="products">
          {homeProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="home" />
          ))}
        </div>
      </section>

      <section className="special">
        <div className="special-text">
          <h2>New Drink</h2>
          <p>
            A refreshing iced latte with creamy milk and rich espresso.
            Perfect for hot days and coffee lovers.
          </p>
          <div className="special-price">$2.43</div>
        </div>
      </section>
    </>
  )
}

export default Home
