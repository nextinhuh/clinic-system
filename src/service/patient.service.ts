import { toast } from '@/components/ui/use-toast'
import { patientAnamnesisSchema, patientSchema } from '@/utils/schemas'
import {
  CreatePatientFormData,
  PatientAnamnesisData,
  PatientData,
  UpdatePatientAnamnesisFormData,
  UpdatePatientFormData,
} from '@/utils/types'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

const PATIENT_FIRESTORE_KEY = 'patients'
const ANAMNESIS_FIRESTORE_KEY = 'anamnesis'

export async function allPatient(doctorId: string): Promise<PatientData[]> {
  const patientList: PatientData[] = []
  const db = getFirestore()

  const q = query(
    collection(db, PATIENT_FIRESTORE_KEY),
    where('doctorId', '==', doctorId),
  )

  const querySnapshot = await getDocs(q)

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

export async function createPatient(patientData: CreatePatientFormData) {
  const db = getFirestore()

  await addDoc(collection(db, PATIENT_FIRESTORE_KEY), patientData).catch(
    (error) => {
      throw new Error(error.message)
    },
  )
}

export async function updatePatient(
  patientId: string,
  patientData: UpdatePatientFormData,
) {
  const db = getFirestore()

  await updateDoc(doc(db, PATIENT_FIRESTORE_KEY, patientId), patientData)
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

export async function createAnamnesisPatient(
  anamnesisData: UpdatePatientAnamnesisFormData,
) {
  const db = getFirestore()

  await addDoc(collection(db, ANAMNESIS_FIRESTORE_KEY), anamnesisData)
    .then(async (anamnesisCreated) => {
      await updateDoc(doc(db, PATIENT_FIRESTORE_KEY, anamnesisData.patientId), {
        anamnesisId: anamnesisCreated.id,
      })
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
  const anamneseSnap = await getDoc(
    doc(db, ANAMNESIS_FIRESTORE_KEY, anamneseId),
  )

  if (anamneseSnap.exists()) {
    return patientAnamnesisSchema.parse({
      id: anamneseSnap.id,
      ...anamneseSnap.data(),
    })
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

  await updateDoc(docRef, anamnesisData)
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
