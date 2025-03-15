import { createContext, useContext, useState, useEffect } from 'react';
import { 
  AuthContextType, 
  AuthProviderProps, 
  AuthState, 
  User 
} from './AuthContext.type';
import { authService } from '../services/authService';

// Valor inicial del contexto
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null
};

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Verificar si hay un token guardado al cargar
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      
      if (token && userString) {
        try {
          const user = JSON.parse(userString) as User;
          
          // Configurar axios con el token
          if (token) {
            console.log('Restaurando sesión con token guardado');
            setState({
              isAuthenticated: true,
              user,
              token,
              isLoading: false,
              error: null
            });
          }
        } catch (error) {
          console.error('Error al parsear la información de usuario:', error);
          // Si hay un error, limpiar localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Función de inicio de sesión
  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const authResponse = await authService.login(email, password);
      
      setState({
        isAuthenticated: true,
        user: authResponse.user,
        token: authResponse.token,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error en AuthContext durante login:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Credenciales incorrectas. Por favor intenta de nuevo.' 
      }));
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    authService.logout();
    setState(initialState);
  };

  // Limpiar errores
  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  // Valor del contexto
  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};