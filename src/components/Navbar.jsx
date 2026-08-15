import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthModal from './AuthModal.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const linkClass = ({ isActive }) => (isActive ? 'active' : '')
  const { totalItems } = useCart()
  const { currentUser, logout } = useAuth()

  const [authMode, setAuthMode] = useState(null) // null | 'login' | 'signup'
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav>
      <div className="logo">Toto Coffee</div>

      <button
        className={`nav-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><NavLink to="/" end className={linkClass} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/menu" className={linkClass} onClick={closeMenu}>Menu</NavLink></li>
          <li><NavLink to="/delivery" className={linkClass} onClick={closeMenu}>Delivery</NavLink></li>
          <li><NavLink to="/contact" className={linkClass} onClick={closeMenu}>Contact</NavLink></li>
        </ul>

        <div className="auth-buttons">
          <NavLink to="/cart" className="cart-link" onClick={closeMenu}>
            Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>

          {currentUser ? (
            <>
              <span className="user-greeting">Hi, {currentUser.name || currentUser.email}</span>
              <button
                className="btn-login"
                onClick={() => {
                  logout()
                  closeMenu()
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-login"
                onClick={() => {
                  setAuthMode('login')
                  closeMenu()
                }}
              >
                Login
              </button>
              <button
                className="btn-signup"
                onClick={() => {
                  setAuthMode('signup')
                  closeMenu()
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {authMode && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setAuthMode(null)}
        />
      )}
    </nav>
  )
}

export default Navbar
