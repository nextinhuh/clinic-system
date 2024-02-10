import {
  Navigate,
  useLocation,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom'
import { useAuth } from '@/hook/Auth'

type RouteProps = {
  isPrivate?: boolean
  component: React.ComponentType
} & ReactDOMRouteProps

export function Route({ isPrivate = false, component: Component }: RouteProps) {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <ReactDOMRoute>
      {isPrivate === !!user ? (
        <Component />
      ) : (
        <Navigate
          to={{
            pathname: isPrivate ? '/' : '/dashboard',
          }}
          state={{ from: location }}
        />
      )}
    </ReactDOMRoute>
  )
}
