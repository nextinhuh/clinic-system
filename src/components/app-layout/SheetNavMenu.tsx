import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { NavMenu } from './NavMenu'
import { useLocation } from 'react-router-dom'

export interface SheetNavMenuRef {
  handleOpenSheetMenu: () => void
  handleCloseSheetMenu: () => void
}

// eslint-disable-next-line react/display-name
export const SheetNavMenu = forwardRef<SheetNavMenuRef>((_, ref) => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useMemo(() => {
    setOpen(false)
  }, [location])

  useImperativeHandle(ref, () => ({
    handleOpenSheetMenu(): void {
      setOpen(true)
    },
    handleCloseSheetMenu(): void {
      setOpen(false)
    },
  }))

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <NavMenu />
      </SheetContent>
    </Sheet>
  )
})
