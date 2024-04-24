import { toast } from '@/components/ui/use-toast'
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
  updateDoc,
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

export async function getAnamnesisByAnamneseId(
  anamneseId: string,
): Promise<PatientAnamnesisData> {
  const db = getFirestore()

  const docRef = doc(db, ANAMNESIS_FIRESTORE_KEY, anamneseId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return patientAnamnesisSchema.parse(docSnap.data())
  } else {
    throw new Error('Anamnesis não encontrada!')
  }
}

export async function updateAnamnesisPatient(
  anamnesisId: string,
  anamnesisData: UpdatePatientAnamnesisFormData,
) {
  const db = getFirestore()

  const docRef = doc(db, ANAMNESIS_FIRESTORE_KEY, anamnesisId)

  await updateDoc(docRef, {
    reason: anamnesisData.reason,
    symptoms: anamnesisData.symptoms,
    medicalHistory: anamnesisData.medicalHistory,
    takingMedication: anamnesisData.takingMedication,
    allergy: anamnesisData.allergy,
    diseaseHistory: anamnesisData.diseaseHistory,
    consumeDrug: anamnesisData.consumeDrug,
    dailyRoutine: anamnesisData.dailyRoutine,
    emotionalState: anamnesisData.emotionalState,
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
