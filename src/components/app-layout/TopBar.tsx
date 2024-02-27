import { NavMenu } from '../app-layout/NavMenu'
import { IoMdMenu } from 'react-icons/io'
import { AvatarProfile } from './AvatarProfile'

interface TopBarProps {
  openUpdateProfileDialog: () => void
}

export function TopBar({ openUpdateProfileDialog }: TopBarProps) {
  return (
    <header className="flex items-center justify-between w-[100%] border-b-[1px] border-white mt-4 pb-5">
      <div className="flex w-[100%] sm:w-[30rem] items-center sm:gap-10">
        <IoMdMenu
          className="mt-3 text-slate-400 cursor-pointer hover:text-white duration-100 flex sm:hidden"
          size={24}
        />

        <h1 className="text-3xl font-['Pacifico'] w-[100%] text-center sm:text-left">
          Clinic System
        </h1>

        <NavMenu />
      </div>

      <AvatarProfile openUpdateProfileDialog={openUpdateProfileDialog} />
    </header>
  )
}
