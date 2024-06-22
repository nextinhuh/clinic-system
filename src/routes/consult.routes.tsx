import { Consult } from '@/pages/consult'
import { CreateConsult } from '@/pages/consult/create'
import { DetailPatient } from '@/pages/patient/detail'

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
    element: <DetailPatient />,
  },
]
