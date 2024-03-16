import { patientSchema } from '@/utils/schemas'
import { CreatePatientFormData, PatientData } from '@/utils/types'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore'

const PATIENT_FIRESTORE_KEY = 'patients'

export async function allPatient(): Promise<PatientData[]> {
  const patientList: PatientData[] = []
  const db = getFirestore()

  const querySnapshot = await getDocs(collection(db, PATIENT_FIRESTORE_KEY))

  querySnapshot.forEach((doc) => {
    const patient = patientSchema.parse({
      id: doc.id,
      name: doc.data().name,
      age: doc.data().age,
      email: doc.data().email,
      anamnesisId: doc.data().anamnesisId ? doc.data().anamnesisId : '',
    })
    patientList.push(patient)
  })

  return patientList
}

export async function patientById(patientId: string): Promise<PatientData> {
  const db = getFirestore()

  const docRef = doc(db, PATIENT_FIRESTORE_KEY, patientId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return patientSchema.parse({
      id: docSnap.id,
      name: docSnap.data().name,
      age: docSnap.data().age,
      email: docSnap.data().email,
      anamnesisId: docSnap.data().anamnesisId ? docSnap.data().anamnesisId : '',
    })
  } else {
    throw new Error('Usuário não encontrado!')
  }
}

export async function createPatient(patientData: CreatePatientFormData) {
  const db = getFirestore()

  await addDoc(collection(db, PATIENT_FIRESTORE_KEY), {
    name: patientData.name,
    age: patientData.age,
    email: patientData.email,
  }).catch((error) => {
    throw new Error(error.message)
  })
}
