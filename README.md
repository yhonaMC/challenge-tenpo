# Challenge Tenpo

Aplicación React con sistema de autenticación simulado usando Mock Service Worker (MSW).

## Tecnologías utilizadas

- React 18
- TypeScript
- Vite
- React Router
- React Query
- Tailwind CSS
- Mock Service Worker (MSW)
- Zustand (para manejo de estado)
- Axios (para peticiones HTTP)

## Características

- Sistema de autenticación simulado con MSW
- Formulario de login con validaciones
- Rutas protegidas
- Persistencia de sesión con localStorage
- Diseño responsive con Tailwind CSS
- Componentes UI reutilizables

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/yhonaMC/challenge-tenpo.git
cd challenge-tenpo
```

2. Instala las dependencias:
```bash
pnpm install
```

3. Inicia el servidor de desarrollo:
```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

## Uso

### Credenciales para login

Puedes usar cualquier combinación de email y contraseña que cumpla con las validaciones:

- **Email**: Cualquier email con formato válido (ej: `usuario@example.com`)
- **Contraseña**: Cualquier contraseña de al menos 8 caracteres

### Flujo de la aplicación

1. Al iniciar la aplicación, serás redirigido a la página de login
2. Ingresa un email y contraseña válidos
3. Después de iniciar sesión, serás redirigido al dashboard
4. Puedes cerrar sesión con el botón en la esquina superior derecha

## Cómo funciona la autenticación simulada

Esta aplicación utiliza Mock Service Worker (MSW) para interceptar las peticiones HTTP y simular un backend:

1. MSW intercepta la petición POST a `/api/auth/login`
2. Valida que el email tenga formato correcto y la contraseña al menos 8 caracteres
3. Devuelve un token JWT simulado y datos de usuario
4. El token se almacena en localStorage y se configura en los headers de Axios
5. Las rutas protegidas verifican la autenticación antes de renderizar

## Estructura del proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── auth/           # Componentes relacionados con autenticación
│   └── ui/             # Componentes de UI genéricos
├── lib/                # Utilidades y servicios
│   ├── context/        # Contextos de React
│   └── services/       # Servicios para API
├── mocks/              # Configuración de MSW
├── pages/              # Páginas/rutas de la aplicación
└── App.tsx             # Componente principal
```

## Desarrollo

Para ejecutar las pruebas:
```bash
pnpm test
```

Para construir la aplicación para producción:
```bash
pnpm build
```