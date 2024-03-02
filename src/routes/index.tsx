import { createBrowserRouter } from 'react-router-dom'
import { AuthPage } from '@/pages/auth'
import { PrivateRoutes } from './Route'
import { Home } from '@/pages/home'
import { Patient } from '@/pages/patient'
import { Appointment } from '@/pages/appointment'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'patient',
        element: <Patient />,
      },
      {
        path: 'appointment',
        element: <Appointment />,
      },
    ],
  },
  {
    path: '/signin',
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <p>404 - Page not found</p>,
  },
])
