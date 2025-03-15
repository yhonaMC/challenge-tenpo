import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Configure the Service Worker with our handlers
export const worker = setupWorker(...handlers)

// Log the initialized handlers for debugging
console.log('MSW Handlers:', handlers.map(handler => {
  // @ts-ignore - Access internal properties for debugging
  const { method, path } = handler.info
  return `${method} ${path}`
}))