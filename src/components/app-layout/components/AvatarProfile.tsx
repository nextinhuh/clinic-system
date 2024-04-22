import { useAuth } from '@/hook/Auth'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { getUserNameFallback } from '@/utils/parse'
import { CgProfile, CgLogOut } from 'react-icons/cg'
import { IoMdSettings } from 'react-icons/io'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Separator } from '../../ui/separator'

interface AvatarProps {
  openUpdateProfileDialog: () => void
}

export function AvatarProfile({ openUpdateProfileDialog }: AvatarProps) {
  const { user, signOut } = useAuth()

  return (
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
  )
}
