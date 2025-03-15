# Challenge Tenpo

React application with simulated authentication system using Mock Service Worker (MSW).

## Technologies

- React 18
- TypeScript
- Vite
- React Router
- React Query
- Tailwind CSS
- Mock Service Worker (MSW)
- Zustand (for state management)
- Axios (for HTTP requests)

## Features

- Simulated authentication system with MSW
- Login form with validations
- Protected routes
- Session persistence with localStorage
- Responsive design with Tailwind CSS
- Reusable UI components

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yhonaMC/challenge-tenpo.git
cd challenge-tenpo
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

## Usage

### Login credentials

You can use any combination of email and password that meets the validations:

- **Email**: Any valid email format (e.g.: `user@example.com`)
- **Password**: Any password with at least 8 characters

### Application flow

1. When starting the application, you'll be redirected to the login page
2. Enter a valid email and password
3. After logging in, you'll be redirected to the dashboard
4. You can log out with the button in the upper right corner

## How simulated authentication works

This application uses Mock Service Worker (MSW) to intercept HTTP requests and simulate a backend:

1. MSW intercepts the POST request to `/api/auth/login`
2. It validates that the email has the correct format and the password has at least 8 characters
3. It returns a simulated JWT token and user data
4. The token is stored in localStorage and configured in Axios headers
5. Protected routes verify authentication before rendering

## Project structure

```
src/
├── components/         # Reusable components
│   ├── auth/           # Authentication-related components
│   └── ui/             # Generic UI components
├── lib/                # Utilities and services
│   ├── context/        # React contexts
│   └── services/       # API services
├── mocks/              # MSW configuration
├── pages/              # Application pages/routes
└── App.tsx             # Main component
```

## Development

To run tests:
```bash
pnpm test
```

To build the application for production:
```bash
pnpm build
```