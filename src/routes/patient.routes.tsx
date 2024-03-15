import { Patient } from '@/pages/patient'
import { CreatePatient } from '@/pages/patient/create'

export const PatientRoutes = [
  {
    path: 'patient',
    element: <Patient />,
  },
  {
    path: '/patient/create',
    element: <CreatePatient />,
  },
]
