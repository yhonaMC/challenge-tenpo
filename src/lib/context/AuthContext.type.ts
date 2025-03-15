export interface User {
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  isInitialized: boolean
  login: (email: string, password: string) => Promise<AuthResponse>
  logout: () => void
}