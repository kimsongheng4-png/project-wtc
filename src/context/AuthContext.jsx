import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'toto_coffee_users'
const SESSION_KEY = 'toto_coffee_session'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY))
      if (saved) setCurrentUser(saved)
    } catch {
      // ignore corrupted session data
    }
  }, [])

  const signup = ({ name, email, password }) => {
    const users = loadUsers()
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    )
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' }
    }

    const newUser = { name, email, password }
    saveUsers([...users, newUser])

    const session = { name, email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setCurrentUser(session)
    return { success: true }
  }

  const login = ({ email, password }) => {
    const users = loadUsers()
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!match) {
      return { success: false, error: 'Incorrect email or password.' }
    }

    const session = { name: match.name, email: match.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setCurrentUser(session)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
