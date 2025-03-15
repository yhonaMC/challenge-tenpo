import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Validación simple de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!email) {
      setEmailError('El email es requerido');
      return false;
    } else if (!isValid) {
      setEmailError('Email inválido');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  // Validación de contraseña (mínimo 8 caracteres)
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('La contraseña es requerida');
      return false;
    } else if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  // Manejar cambios en los campos
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) clearError();
    if (emailError) validateEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) clearError();
    if (passwordError) validatePassword(e.target.value);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar ambos campos
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      await login(email, password);
      // Redireccionar a la página principal tras login exitoso
      navigate('/dashboard');
    } catch (err) {
      // El error ya está manejado en el contexto
      console.error('Error en login form:', err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>
        <p className="text-gray-500 mt-2">
          Ingresa tus credenciales para acceder
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={handleEmailChange}
            disabled={isLoading}
            className={emailError ? 'border-red-500' : ''}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
            disabled={isLoading}
            className={passwordError ? 'border-red-500' : ''}
          />
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>
        
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>
    </div>
  );
};