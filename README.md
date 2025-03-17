# Aplicación de Usuarios Aleatorios

Una aplicación React + TypeScript que implementa autenticación simulada y consume la API RandomUser.me para mostrar información de usuarios.

## Características

- **Autenticación Simulada**: Flujo de inicio/cierre de sesión simulado con gestión de tokens
- **Integración de API**: Consume la API RandomUser.me para obtener y mostrar datos de usuarios
- **Carga de Datos Optimizada**: Implementa desplazamiento infinito y virtualización para manejar grandes conjuntos de datos
- **Interfaz Moderna**: Diseño futurista utilizando Tailwind CSS y componentes shadcn/ui

## Implementación de la Lista en la Página Principal

La lista en la página principal está implementada utilizando un enfoque de lista virtualizada para un rendimiento óptimo. Elegimos usar React Query para gestionar la obtención y el caché de datos, combinado con react-window para la virtualización. Esta implementación:

1. **Carga Eficiente de Datos**: Utiliza el caché automático y la recarga en segundo plano de React Query para minimizar las llamadas a la API
2. **Renderizado Virtualizado**: Solo renderiza los elementos visibles en el DOM, mejorando significativamente el rendimiento con grandes conjuntos de datos
3. **Diseño de Cuadrícula Responsivo**: Se adapta a diferentes tamaños de pantalla utilizando las utilidades responsivas de Tailwind
4. **Desplazamiento Infinito**: Implementa carga de datos automática al desplazarse para una experiencia fluida
5. **Actualizaciones Optimistas**: Proporciona retroalimentación instantánea mientras los cambios se procesan en el servidor

Este enfoque fue seleccionado porque equilibra el rendimiento con la experiencia del desarrollador, permitiendo un desplazamiento suave incluso con miles de elementos mientras mantiene una base de código limpia y mantenible.

## Tecnologías Utilizadas

- **React 19** con TypeScript para el frontend
- **Zustand** para gestión de estado
- **Axios** para peticiones a la API
- **React Query** para obtención y caché de datos
- **React Router** para navegación
- **React Window** para listas virtualizadas
- **Tailwind CSS** para estilos

## Estructura del Proyecto

- `src/components`: Componentes UI reutilizables
- `src/lib`: Utilidades, hooks y stores
- `src/pages`: Componentes principales de páginas
- `src/lib/context`: Contexto de autenticación para rutas protegidas
- `src/lib/hooks`: Hooks personalizados para obtención de datos

## Primeros Pasos

### Requisitos Previos

- Node.js (v18 o superior)
- npm o pnpm

### Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd random-users-app
```

2. Instalar dependencias:

```bash
npm install
# o
pnpm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
# o
pnpm dev
```

4. Abrir [http://localhost:5173](http://localhost:5173) para ver la aplicación en tu navegador.

## Autenticación

Esta aplicación utiliza un sistema de autenticación simulado:

- Cualquier combinación de correo electrónico y contraseña no vacía funcionará
- El estado de autenticación se gestiona en memoria usando Zustand
- No se implementa persistencia de datos (según los requisitos)

## Uso de la API

La aplicación obtiene usuarios de la API RandomUser.me:

- Cada página obtiene 50 usuarios a la vez
- Se implementa desplazamiento infinito para una carga de datos fluida
- La solicitud a la API incluye el token de autenticación en los encabezados

## Compilación para Producción

```bash
npm run build
# o
pnpm build
```

Esto generará archivos optimizados para producción en el directorio `dist`.