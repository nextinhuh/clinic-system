import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hook/Auth'
import { AppLayout } from '@/components/app-layout'

export function PrivateRoutes() {
  const { user } = useAuth()

  if (user && Object.keys(user).length === 0) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{
          error:
            'No authentication cookie was found, please complete the login process.',
        }}
      />
    )
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
