import { consultSchema } from '@/utils/schemas'
import { ConsultData, CreateConsultFormData } from '@/utils/types'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'

const CONSULT_FIRESTORE_KEY = 'consults'

export async function createConsult(consultData: CreateConsultFormData) {
  const db = getFirestore()

  await addDoc(collection(db, CONSULT_FIRESTORE_KEY), {
    ...consultData,
    date: consultData.date.toISOString(),
  }).catch((error) => {
    throw new Error(error.message)
  })
}

export async function allConsults(doctorId: string): Promise<ConsultData[]> {
  const consultList: ConsultData[] = []
  const db = getFirestore()

  const q = query(
    collection(db, CONSULT_FIRESTORE_KEY),
    where('doctorId', '==', doctorId),
  )

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    const consult = consultSchema.parse({
      id: doc.id,
      date: new Date(doc.data().date),
      resume: doc.data().resume,
      prescription: doc.data().prescription,
      assessment: doc.data().assessment,
      guidance: doc.data().guidance,
      status: doc.data().status,
      doctorId: doc.data().doctorId,
      patientName: doc.data().patientName,
      patientId: doc.data().patientId,
    })
    consultList.push(consult)
  })
  console.log(consultList)
  return consultList
}

export async function consultById(patientId: string): Promise<ConsultData> {
  const db = getFirestore()

  const docRef = doc(db, CONSULT_FIRESTORE_KEY, patientId)
  const consultSnap = await getDoc(docRef)

  if (consultSnap.exists()) {
    return consultSchema.parse({
      ...consultSnap.data(),
      id: consultSnap.id,
      date: new Date(consultSnap.data().date),
    })
  } else {
    throw new Error('Consulta não encontrado!')
  }
}

/*


export async function patientById(patientId: string): Promise<PatientData> {
  const db = getFirestore()

  const docRef = doc(db, PATIENT_FIRESTORE_KEY, patientId)
  const patientSnap = await getDoc(docRef)

  if (patientSnap.exists()) {
    return patientSchema.parse({
      id: patientSnap.id,
      ...patientSnap.data(),
      anamnesisId: patientSnap.data().anamnesisId
        ? patientSnap.data().anamnesisId
        : '',
    })
  } else {
    throw new Error('Usuário não encontrado!')
  }
}

export async function updatePatientActive(patientId: string, active: boolean) {
  const db = getFirestore()

  await updateDoc(doc(db, PATIENT_FIRESTORE_KEY, patientId), {
    active,
  })
    .catch((error) => {
      throw new Error(error.message)
    })
    .finally(() => {
      toast({
        variant: 'success',
        title: `Paciente ${active ? 'habilitado' : 'desabilitado'} com sucesso!`,
        duration: 3000, // 3 SECONDS
      })
    })
}

export async function updatePatient(patientData: UpdatePatientFormData) {
  const db = getFirestore()

  await updateDoc(doc(db, PATIENT_FIRESTORE_KEY, patientData.patientId), {
    age: patientData.age,
    name: patientData.name,
    email: patientData.email,
  })
    .catch((error) => {
      throw new Error(error.message)
    })
    .finally(() => {
      toast({
        variant: 'success',
        title: 'Dados atualizados com sucesso!',
        duration: 3000, // 3 SECONDS
      })
    })
}
*/
