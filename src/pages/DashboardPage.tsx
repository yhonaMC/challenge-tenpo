import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/button';

export const DashboardPage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Proteger ruta - redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Si no está autenticado, no renderizar nada (evita flash de contenido)
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={logout}
          >
            Cerrar sesión
          </Button>
        </div>
      </header>
      
      <main className="mx-auto max-w-7xl p-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Bienvenido, {user.name}</h2>
          
          <div className="p-4 border border-gray-200 rounded mb-4">
            <h3 className="font-medium text-gray-700">Información del usuario</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><span className="font-medium">ID:</span> {user.id}</li>
              <li><span className="font-medium">Email:</span> {user.email}</li>
              <li><span className="font-medium">Nombre:</span> {user.name}</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 text-blue-700 rounded">
            <p className="text-sm">
              Esta es una demostración de una ruta protegida que solo es accesible después
              de iniciar sesión. La autenticación se simula utilizando Mock Service Worker.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};