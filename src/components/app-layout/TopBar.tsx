import { NavMenu } from '../app-layout/NavMenu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'
import { IoMdSettings } from 'react-icons/io'
import { CgProfile, CgLogOut } from 'react-icons/cg'
import { useAuth } from '@/hook/Auth'
import { getUserNameFallback } from '@/utils/parse'

interface TopBarProps {
  openUpdateProfileDialog: () => void
}

export function TopBar({ openUpdateProfileDialog }: TopBarProps) {
  const { user, signOut } = useAuth()

  return (
    <header className="flex items-center justify-between w-[100%] border-b-[1px] border-white mt-4 pb-5">
      <div className="flex gap-10">
        <h1 className="text-3xl font-['Pacifico']">Clinic System</h1>
        <NavMenu />
      </div>

      <div className="flex items-center gap-6">
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={user?.photoURL ? user?.photoURL : ''}
                alt="@shadcn"
              />
              <AvatarFallback>
                {getUserNameFallback(String(user?.name))}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-base font-bold">{user?.name}</p>
            <p className="text-xs font-bold text-gray-400">{user?.email}</p>

            <Separator className="my-4" />

            <div
              className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-white w-16"
              onClick={openUpdateProfileDialog}
            >
              <CgProfile size={20} />
              <p>Perfil</p>
            </div>

            <div className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-white w-36 mt-2">
              <IoMdSettings size={20} />
              <p>Configurações</p>
            </div>

            <Separator className="my-4" />

            <div
              className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-white w-16"
              onClick={signOut}
            >
              <CgLogOut size={24} />
              <p>Sair</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}
