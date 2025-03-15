import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/context/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';

export const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Challenge Tenpo
          </h2>
        </div>
        
        <LoginForm />
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Usa cualquier email y contraseña válidos para ingresar</p>
          <p className="mt-2 text-xs">
            Esta es una demo con autenticación simulada usando MSW
          </p>
        </div>
      </div>
    </div>
  );
};