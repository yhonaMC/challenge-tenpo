// Tipo para el usuario autenticado
export interface User {
  id: string;
  email: string;
  name: string;
}

// Respuesta de la API de autenticación
export interface AuthResponse {
  token: string;
  user: User;
}

// Estado del contexto de autenticación
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Props para el proveedor de autenticación
export interface AuthProviderProps {
  children: React.ReactNode;
}

// Contexto de autenticación
export interface AuthContextType {
  // Estado
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}