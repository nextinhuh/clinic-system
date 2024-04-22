import { NavLink } from 'react-router-dom'

export function NavMenu() {
  return (
    <div className="flex flex-col items-center gap-4 mt-8 sm:mt-0 sm:flex-row sm:items-end">
      <NavLink
        to="/"
        className={({ isActive }) =>
          (isActive
            ? 'text-white'
            : 'text-slate-400 hover:text-white duration-100') +
          ' text-base font-bold cursor-pointer '
        }
      >
        INÍCIO
      </NavLink>
      <NavLink
        to="/patient"
        className={({ isActive }) =>
          (isActive
            ? 'text-white'
            : 'text-slate-400 hover:text-white duration-100') +
          ' text-base font-bold cursor-pointer '
        }
      >
        PACIENTES
      </NavLink>
      <NavLink
        to="/appointment"
        className={({ isActive }) =>
          (isActive
            ? 'text-white'
            : 'text-slate-400 hover:text-white duration-100') +
          ' text-base font-bold cursor-pointer '
        }
      >
        CONSULTAS
      </NavLink>
    </div>
  )
}
