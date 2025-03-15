import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

window.mswReady = false

async function prepare() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./mocks/browser')

      window.addEventListener('unhandledrejection', (event) => {
        console.error('[MSW] Unhandled promise rejection:', event.reason)
      })

      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
          options: {
            scope: '/'
          }
        }
      })

      window.mswReady = true
      console.log('[MSW] Mock Service Worker initialized successfully')
      console.log('[MSW] Login test: use demo@tenpo.com / 12345678')
    } catch (error) {
      console.error('[MSW] Failed to initialize Mock Service Worker:', error)
    }
  }
}

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

declare global {
  interface Window {
    mswReady: boolean
  }
}