import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

// Crear cliente de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

// Inicializar MSW en desarrollo
async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    
    // Iniciar el worker con opciones
    await worker.start({
      onUnhandledRequest: 'bypass', // No mostrar advertencias para peticiones no manejadas
    })
    
    console.log('[MSW] Mock Service Worker iniciado')
  }
}

// Inicializar MSW antes de renderizar la aplicación
prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
})