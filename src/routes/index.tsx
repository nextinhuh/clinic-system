import { createBrowserRouter } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { AuthPage } from '@/pages/auth'

/*
export function Routes() {
  return (
    <BrowserRouter basename="/">
      <RoutesDOM>
        <Route path="/" component={SignIn} />
      </RoutesDOM>
    </BrowserRouter>
  )
}
*/

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: 'home',
    element: <Home />,
  },
])
