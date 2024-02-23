import { ReactNode, useEffect, useRef } from 'react'
import { TopBar } from './TopBar'
import {
  UpdateProfileDialog,
  UpdateProfileDialogRef,
} from '../update-profile-dialog'
import { useAuth } from '@/hook/Auth'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useAuth()
  const updateProfileDialogRef = useRef<UpdateProfileDialogRef>(null)

  useEffect(() => {
    if (user?.name === '' || user?.name == null) {
      updateProfileDialogRef.current?.handleOpenDialog()
    }
  }, [])

  return (
    <div className="container">
      <TopBar
        openUpdateProfileDialog={() =>
          updateProfileDialogRef.current?.handleOpenDialog()
        }
      />
      <UpdateProfileDialog ref={updateProfileDialogRef} />
      {children}
    </div>
  )
}
