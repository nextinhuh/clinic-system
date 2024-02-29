import { ReactNode, useEffect, useRef } from 'react'
import { TopBar } from './TopBar'
import {
  UpdateProfileDialog,
  UpdateProfileDialogRef,
} from '../update-profile-dialog'
import { useAuth } from '@/hook/Auth'
import { SheetNavMenu, SheetNavMenuRef } from './SheetNavMenu'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useAuth()
  const updateProfileDialogRef = useRef<UpdateProfileDialogRef>(null)
  const sheetNavMenuRef = useRef<SheetNavMenuRef>(null)

  useEffect(() => {
    if (user?.name === '' || user?.name == null) {
      updateProfileDialogRef.current?.handleOpenDialog()
    }
  }, [])

  return (
    <div className="container">
      <TopBar
        openSheetNavMenu={() => sheetNavMenuRef.current?.handleOpenSheetMenu()}
        openUpdateProfileDialog={() =>
          updateProfileDialogRef.current?.handleOpenDialog()
        }
      />
      <SheetNavMenu ref={sheetNavMenuRef} />
      <UpdateProfileDialog ref={updateProfileDialogRef} />
      {children}
    </div>
  )
}
