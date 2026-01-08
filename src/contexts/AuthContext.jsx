import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = (nickname, role) => {
    // Use predefined user IDs from db.json to match with sample data
    const userId = role === 'admin' ? 'user_1' : 'user_2'

    const userData = {
      id: userId,
      name: nickname,
      email: `${nickname.toLowerCase().replace(/\s+/g, '.')}@company.com`,
      role: role, // 'admin' or 'employee'
      avatar: null,
      department: role === 'admin' ? 'Management' : 'Engineering',
      createdAt: new Date().toISOString(),
    }

    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const isAuthenticated = () => {
    return user !== null
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  const isEmployee = () => {
    return user?.role === 'employee'
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isEmployee,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
