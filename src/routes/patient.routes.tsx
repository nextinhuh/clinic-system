import { Patient } from '@/pages/patient'
import { CreatePatient } from '@/pages/patient/create'
import { DetailPatient } from '@/pages/patient/detail'

export const PatientRoutes = [
  {
    path: 'patient',
    element: <Patient />,
  },
  {
    path: '/patient/create',
    element: <CreatePatient />,
  },
  {
    path: '/patient/:patientId',
    element: <DetailPatient />,
  },
]
