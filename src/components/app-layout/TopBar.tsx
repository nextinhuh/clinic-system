import { NavMenu } from '../app-layout/NavMenu'
import { IoMdMenu } from 'react-icons/io'
import { AvatarProfile } from './AvatarProfile'

interface TopBarProps {
  openSheetNavMenu: () => void
  openUpdateProfileDialog: () => void
}

export function TopBar({
  openUpdateProfileDialog,
  openSheetNavMenu,
}: TopBarProps) {
  return (
    <header className="flex items-center justify-between w-[100%] border-b-[1px] border-white mt-4 pb-5">
      <div className="flex w-[100%] sm:w-[30rem] sm:gap-10">
        <IoMdMenu
          size={24}
          onClick={openSheetNavMenu}
          className="mt-3 text-slate-400 cursor-pointer hover:text-white duration-100 flex sm:hidden"
        />

        <h1 className="text-3xl font-['Pacifico'] w-[100%] text-center sm:text-left">
          Clinic System
        </h1>

        <div className="hidden sm:flex">
          <NavMenu />
        </div>
      </div>

      <AvatarProfile openUpdateProfileDialog={openUpdateProfileDialog} />
    </header>
  )
}
