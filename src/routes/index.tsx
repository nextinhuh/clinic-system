import { createBrowserRouter } from 'react-router-dom'
import { AuthPage } from '@/pages/auth'
import { PrivateRoutes } from './PrivateRoutes'
import { Home } from '@/pages/home'
import { Appointment } from '@/pages/appointment'
import { PatientRoutes } from './patient.routes'

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
        path: 'appointment',
        element: <Appointment />,
      },
      ...PatientRoutes,
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
