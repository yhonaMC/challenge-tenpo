import { http, HttpResponse, delay } from 'msw'

// Definir la interfaz para los datos de login
interface LoginRequest {
  email: string;
  password: string;
}

// Token fijo para facilitar pruebas
const DEMO_TOKEN = 'token-fake-demo-tenpo-123456'

// Definimos nuestros handlers para interceptar peticiones HTTP
export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    // Simular un retraso para imitar la latencia de red
    await delay(500)
    
    // Extraer datos de la solicitud
    const data = await request.json() as LoginRequest
    const { email, password } = data
    
    console.log(`Intento de login con email: ${email}`)
    
    // Validación simple de credenciales
    // En este caso, cualquier email válido y una contraseña de al menos 8 caracteres
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isValidPassword = password && password.length >= 8
    
    if (isValidEmail && isValidPassword) {
      // Usar un token fijo para demo@tenpo.com y tokens aleatorios para otros usuarios
      const fakeToken = email === 'demo@tenpo.com' 
        ? DEMO_TOKEN 
        : `fake-token-${Math.random().toString(36).substring(2, 15)}`
      
      console.log(`Login exitoso. Token generado: ${fakeToken}`)

      return HttpResponse.json(
        { 
          token: fakeToken,
          user: {
            id: 1,
            email,
            name: email === 'demo@tenpo.com' ? 'Usuario Demo Tenpo' : 'Usuario Demo'
          }
        },
        { 
          status: 200,
          headers: {
            'Authorization': `Bearer ${fakeToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
    } else {
      // Si las credenciales no son válidas, devolvemos un error
      return HttpResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 }
      )
    }
  })
]