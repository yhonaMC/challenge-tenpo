import { http, HttpResponse, delay } from 'msw'

// Interface for login data
interface LoginRequest {
  email: string;
  password: string;
}

// Demo token - would be dynamically generated in a real API
const DEMO_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// Mock API handlers
export const handlers = [
  // Login handler
  http.post('/api/auth/login', async ({ request }) => {
    // Simulate network delay
    await delay(500);
    
    // Parse request body
    const data = await request.json() as LoginRequest;
    const { email, password } = data;
    
    console.log('Login attempt:', { email, password: '*'.repeat(password.length) });
    
    // Simple validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length >= 8;
    
    if (isValidEmail && isValidPassword) {
      // Generate mock user data
      const userId = Math.random().toString(36).substring(2, 15);
      const name = email.split('@')[0];
      
      console.log('Login successful, generating token');
      
      // Return success response
      return HttpResponse.json(
        {
          token: DEMO_TOKEN,
          user: {
            id: userId,
            email,
            name: name.charAt(0).toUpperCase() + name.slice(1),
          }
        },
        { status: 200 }
      );
    } else {
      console.log('Login failed: invalid credentials');
      
      // Return error response
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
  }),
]