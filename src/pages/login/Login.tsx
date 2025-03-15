import { useState } from 'react'
import { Container } from '../../components/Container'
import { LoginForm } from './LoginForm'
import { useAuth } from '../../lib/context/AuthContext'

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login, isInitialized } = useAuth()

  if (!isInitialized) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Initializing auth system...</h1>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        
        {/* MSW Status Indicator */}
        <div className="w-full mb-4 text-center">
          <span className={`px-2 py-1 rounded-full text-xs ${window.mswReady ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            Mock API: {window.mswReady ? 'Ready' : 'Initializing...'}
          </span>
        </div>
        
        {error && (
          <div className="w-full bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <LoginForm
          onSubmit={async (values) => {
            setLoading(true)
            setError(null)
            
            try {
              console.log('Login page: Attempting login with:', values.email)
              await login(values.email, values.password)
            } catch (err: any) {
              console.error('Login page error:', err)
              setError(err?.message || 'Login failed. Please try again.')
            } finally {
              setLoading(false)
            }
          }}
          loading={loading}
        />
      </div>
    </Container>
  )
}

export default Login