import { ReactNode } from 'react'
import { TopBar } from './topbar'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="container">
      <TopBar />
      {children}
    </div>
  )
}
