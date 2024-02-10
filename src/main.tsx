import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './components/theme/provider.tsx'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={routes} />
    </ThemeProvider>
  </React.StrictMode>,
)
