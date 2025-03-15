import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Configuramos el Service Worker con nuestros manejadores
export const worker = setupWorker(...handlers)

// Agregamos mensajes de depuración
console.log('[MSW] Configuración inicializada con los siguientes handlers:')
handlers.forEach((handler, index) => {
  console.log(`[MSW] Handler ${index + 1}:`, handler.info.method, handler.info.path)
})