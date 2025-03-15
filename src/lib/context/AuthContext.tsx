import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { AuthContextType, User } from './AuthContext.type'
import { authService } from '../services/authService'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      console.log('AuthContext: Checking stored credentials', {
        hasToken: !!storedToken,
        hasUserData: !!storedUser
      })

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser) as User
        setUser(parsedUser)
        setIsAuthenticated(true)
        console.log('AuthContext: Restored session from localStorage')
      }
    } catch (error) {
      console.error('AuthContext: Error restoring session:', error)

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } finally {
      setIsInitialized(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Login attempt with:', email)

      const response = await authService.login(email, password)

      setIsAuthenticated(true)
      setUser(response.user)

      console.log('AuthContext: Login successful, user:', response.user)

      navigate('/')
      return response
    } catch (error) {
      console.error('AuthContext: Login error:', error)

      throw error
    }
  }

  const logout = () => {
    console.log('AuthContext: Logging out')
    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    isInitialized,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate('/')
    return null
  }

  return <>{children}</>
}