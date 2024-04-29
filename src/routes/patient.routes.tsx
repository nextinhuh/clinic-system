import { Patient } from '@/pages/patient'
import { CreatePatient } from '@/pages/patient/create'
import { DetailPatient } from '@/pages/patient/detail'
import { Schedule } from '@/pages/schedule'

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
  {
    path: 'schedule',
    element: <Schedule />
  }
]
