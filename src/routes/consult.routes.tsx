import { Consult } from '@/pages/consult'
import { CreateConsult } from '@/pages/consult/create'
import { ConsultDetail } from '@/pages/consult/detail'

export const ConsultRoutes = [
  {
    path: 'consult',
    element: <Consult />,
  },
  {
    path: '/consult/create',
    element: <CreateConsult />,
  },
  {
    path: '/consult/detail/:consultId',
    element: <ConsultDetail />,
  },
]
