import axios from 'axios'
import { AuthResponse } from '../context/AuthContext.type'

const API_URL = '/api'

const authApi = axios.create({
  baseURL: API_URL,
  timeout: 10000
})

authApi.interceptors.request.use(
  (config) => {
    console.log('Auth API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data
    })
    return config
  },
  (error) => {
    console.error('Auth API Request error:', error)
    return Promise.reject(error)
  }
)

authApi.interceptors.response.use(
  (response) => {
    console.log('Auth API Response:', {
      status: response.status,
      data: response.data
    })

    return response
  },
  (error) => {
    console.error('Auth API Response error:', error.response || error)
    return Promise.reject(error)
  }
)

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.post('/auth/login', {
        email,
        password
      })

      const token = response.data.token

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      return response.data
    } catch (error: unknown) {
      console.error('AuthService: Login error:', error)
      const errorResponse = error as {
        response?: { data?: { message?: string } }
      }
      const errorMessage =
        errorResponse.response?.data?.message || 'Invalid credentials'
      throw new Error(errorMessage)
    }
  },

  logout: () => {
    delete axios.defaults.headers.common['Authorization']

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}