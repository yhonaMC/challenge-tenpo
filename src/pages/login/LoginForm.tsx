import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/context/AuthContext'
import { LoginFormValues } from './login.types'

const schema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
  })
  .required()

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null)

  const { login } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError(null)

      await login(data.email, data.password)
      console.log('LoginForm: Login successful')
    } catch (error) {
      console.error('LoginForm: Login error:', error)
      if (error instanceof Error) {
        setError(error.message || 'Invalid credentials. Please try again.')
      } else {
        setError('Invalid credentials. Please try again.')
      }
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <div className="h-10 w-10 bg-indigo-600 rounded-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-white"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Iniciar sesión
        </h1>
      </div>

      <div className="flex items-center my-5">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-3 text-gray-400 text-sm">
          Iniciar sesión con correo electrónico
        </span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico*
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  placeholder="mail@website.com"
                  type="email"
                  className={`w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 h-11 rounded-lg ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  autoComplete="email"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña*
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 8 caracteres"
                  className={`w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 h-11 rounded-lg ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 h-11 rounded-lg"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </div>
      </form>
    </div>
  )
}