import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hook/Auth'

export function PrivateRoutes() {
  const { user } = useAuth()

  if (user && Object.keys(user).length === 0) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          error:
            'No authentication cookie was found, please complete the login process.',
        }}
      />
    )
  }

  return <Outlet />
}
