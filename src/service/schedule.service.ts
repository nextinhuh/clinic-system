import { scheduleAppointmentSchema } from '@/utils/schemas'
import {
  CreateScheduleAppointmentFormSchema,
  ScheduleAppointmentSchemaData,
} from '@/utils/types'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

const SCHEDULES_FIRESTORE_KEY = 'schedules'

export async function createSchedule(
  scheduleData: CreateScheduleAppointmentFormSchema,
) {
  const db = getFirestore()

  await addDoc(collection(db, SCHEDULES_FIRESTORE_KEY), {
    ...scheduleData,
    date: scheduleData.date.getTime(),
  }).catch((error) => {
    throw new Error(error.message)
  })
}

export async function allSchedules(
  doctorId: string,
): Promise<ScheduleAppointmentSchemaData[]> {
  const scheduleList: ScheduleAppointmentSchemaData[] = []
  const db = getFirestore()

  const q = query(
    collection(db, SCHEDULES_FIRESTORE_KEY),
    where('doctorId', '==', doctorId),
  )

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    const schedule = scheduleAppointmentSchema.parse({
      id: doc.id,
      patientId: doc.data().patientId,
      date: new Date(doc.data().date),
      patientName: doc.data().patientName,
      doctorName: doc.data().doctorName,
      doctorId: doc.data().doctorId,
      hasConfirm: doc.data().hasConfirm,
      consultId: doc.data().consultId ? doc.data().consultId : '',
    })
    scheduleList.push(schedule)
  })
  return scheduleList
}

export async function updateSchedule(scheduleId: string, consultId: string) {
  const db = getFirestore()

  await updateDoc(doc(db, SCHEDULES_FIRESTORE_KEY, scheduleId), {
    consultId,
  }).catch((error) => {
    throw new Error(error.message)
  })
}
