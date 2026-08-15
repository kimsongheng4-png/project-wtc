import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

function AuthModal({ mode, setMode, onClose }) {
  const isLogin = mode === 'login'
  const { login, signup } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const result = isLogin
      ? login({ email: formData.email, password: formData.password })
      : signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })

    if (!result.success) {
      setError(result.error)
      return
    }

    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    onClose()
  }

  const switchMode = (nextMode) => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    setError('')
    setMode(nextMode)
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? 'active' : ''}
            onClick={() => switchMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={!isLogin ? 'active' : ''}
            onClick={() => switchMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p>
          {isLogin
            ? 'Login to order your favorite coffee'
            : 'Join us for fresh coffee every day'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>

        <p className="auth-switch">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <span onClick={() => switchMode('signup')}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span onClick={() => switchMode('login')}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default AuthModal
