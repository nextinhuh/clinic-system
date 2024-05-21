import { CreateScheduleAppointmentFormSchema } from '@/utils/types'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

const SCHEDULES_FIRESTORE_KEY = 'schedules'

export async function createSchedule(
  scheduleData: CreateScheduleAppointmentFormSchema,
) {
  const db = getFirestore()

  await addDoc(collection(db, SCHEDULES_FIRESTORE_KEY), scheduleData).catch(
    (error) => {
      throw new Error(error.message)
    },
  )
}
