import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// Create a client
const queryClient = new QueryClient()

// Inicializar MSW en desarrollo
async function prepare() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./mocks/browser')
      
      // Iniciar el service worker con opciones más permisivas
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
          options: {
            scope: '/'
          }
        }
      })
      
      console.log('[MSW] Mock Service Worker iniciado correctamente')
    } catch (error) {
      console.error('[MSW] Error al iniciar Mock Service Worker:', error)
    }
  }
}

// Inicializamos MSW antes de renderizar la aplicación
prepare().then(() => {
  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StrictMode>
    </BrowserRouter>
  )
})