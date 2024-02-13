import { createBrowserRouter } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { AuthPage } from '@/pages/auth'
import { PrivateRoutes } from './Route'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '',
        element: <Home />,
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
