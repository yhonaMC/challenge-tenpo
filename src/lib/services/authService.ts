import axios from 'axios'
import { AuthResponse } from '../context/AuthContext.type'

// URL base para las peticiones de autenticación
const API_URL = '/api'

// Crear una instancia de axios específica para auth
const authApi = axios.create({
  baseURL: API_URL,
  timeout: 10000
})

// Añadir interceptor para debugging - ayuda a ver qué está pasando con las peticiones
authApi.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

authApi.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data)
    
    // Verificar si hay un token en los headers
    const authHeader = response.headers['authorization']
    if (authHeader) {
      console.log('Token recibido en headers:', authHeader)
    }
    
    return response
  },
  (error) => {
    console.error('Response error:', error.response || error)
    return Promise.reject(error)
  }
)

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // Realizar una petición que será interceptada por MSW
      const response = await authApi.post('/auth/login', {
        email,
        password
      })

      console.log('Login response:', response)
      
      // Extraer token del cuerpo de la respuesta
      const token = response.data.token
      console.log('Token extraído de la respuesta:', token)

      // Configurar Axios para incluir el token en futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      console.log('Token configurado en Axios:', axios.defaults.headers.common['Authorization'])

      // Guardar el token en localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      console.log('Token y usuario guardados en localStorage')

      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Credenciales inválidas')
    }
  },

  logout: () => {
    // Eliminar el token de Axios
    delete axios.defaults.headers.common['Authorization']

    // Eliminar datos del localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    console.log('Sesión cerrada correctamente')
  }
}