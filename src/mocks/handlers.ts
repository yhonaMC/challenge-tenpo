import { http, HttpResponse, delay } from 'msw'

interface LoginRequest {
  email: string
  password: string
}

const DEMO_TOKEN = 'token-fixed-demo-tenpo-123456'

const DEMO_EMAIL = 'demo@tenpo.com'
const DEMO_PASSWORD = '12345678'

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500)

    try {
      const data = (await request.json()) as LoginRequest
      const { email, password } = data

      console.log(
        'MSW handler: Login attempt with:',
        email,
        'password-length:',
        password?.length
      )

      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        console.log('MSW handler: Demo credentials match - login successful')

        return HttpResponse.json(
          {
            token: DEMO_TOKEN,
            user: {
              id: 'demo-id-123',
              email: DEMO_EMAIL,
              name: 'Usuario Demo Tenpo'
            }
          },
          {
            status: 200,
            headers: {
              Authorization: `Bearer ${DEMO_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        )
      }

      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      const isValidPassword = password && password.length >= 8

      console.log('MSW handler: Validation results:', {
        isValidEmail,
        isValidPassword
      })

      if (isValidEmail && isValidPassword) {
        const fakeToken = `fake-token-${Math.random()
          .toString(36)
          .substring(2, 15)}`

        console.log(
          `MSW handler: Login successful. Token generated: ${fakeToken}`
        )

        return HttpResponse.json(
          {
            token: fakeToken,
            user: {
              id: Math.random().toString(36).substring(2, 10),
              email,
              name:
                email.split('@')[0].charAt(0).toUpperCase() +
                email.split('@')[0].slice(1)
            }
          },
          {
            status: 200,
            headers: {
              Authorization: `Bearer ${fakeToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
      } else {
        console.log('MSW handler: Login failed - invalid credentials')
        return HttpResponse.json(
          { message: 'Credenciales inválidas' },
          { status: 401 }
        )
      }
    } catch (error) {
      console.error('MSW handler: Error processing login request:', error)
      return HttpResponse.json(
        { message: 'Error interno del servidor' },
        { status: 500 }
      )
    }
  })
]