import { createBrowserRouter } from 'react-router-dom'
import { SignIn } from '@/pages/auth/SignIn'
import { Home } from '@/pages/home/Home'

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
    element: <SignIn />,
  },
  {
    path: 'home',
    element: <Home />,
  },
])
