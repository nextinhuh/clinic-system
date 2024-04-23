import { patientAnamnesisSchema, patientSchema } from '@/utils/schemas'
import {
  CreatePatientFormData,
  PatientAnamnesisData,
  PatientData,
  UpdatePatientAnamnesisFormData,
} from '@/utils/types'
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

const PATIENT_FIRESTORE_KEY = 'patients'
const ANAMNESIS_FIRESTORE_KEY = 'anamnesis'

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

export async function createAnamnesisPatient(
  anamnesisData: UpdatePatientAnamnesisFormData,
) {
  const db = getFirestore()

  await addDoc(collection(db, ANAMNESIS_FIRESTORE_KEY), {
    patientId: anamnesisData.patientId,
    reason: anamnesisData.reason,
    symptoms: anamnesisData.symptoms,
    medicalHistory: anamnesisData.medicalHistory,
    takingMedication: anamnesisData.takingMedication,
    allergy: anamnesisData.allergy,
    diseaseHistory: anamnesisData.diseaseHistory,
    consumeDrug: anamnesisData.consumeDrug,
    dailyRoutine: anamnesisData.dailyRoutine,
    emotionalState: anamnesisData.emotionalState,
  }).catch((error) => {
    throw new Error(error.message)
  })
}

export async function getAnamnesisByPatientId(
  patientId: string,
): Promise<PatientAnamnesisData> {
  const db = getFirestore()

  const docRef = collection(db, ANAMNESIS_FIRESTORE_KEY)
  const q = query(docRef, where('patientId', '==', patientId))

  const querySnap = await getDocs(q)

  let anamneseData

  if (!querySnap.empty) {
    querySnap.forEach((doc) => {
      anamneseData = doc
    })
    return patientAnamnesisSchema.parse({
      id: anamneseData.id,
      reason: anamneseData.data().reason,
      symptoms: anamneseData.data().symptoms,
      medicalHistory: anamneseData.data().medicalHistory,
      takingMedication: anamneseData.data().takingMedication,
      allergy: anamneseData.data().allergy,
      diseaseHistory: anamneseData.data().diseaseHistory,
      consumeDrug: anamneseData.data().consumeDrug,
      dailyRoutine: anamneseData.data().dailyRoutine,
      emotionalState: anamneseData.data().emotionalState,
      patientId: anamneseData.data().patientId,
    })
  } else {
    throw new Error('Anamnesis não encontrada!')
  }
}
