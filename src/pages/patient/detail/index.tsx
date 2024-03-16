import { useParams } from 'react-router-dom'

export function DetailPatient() {
  const { patientId } = useParams()

  console.log(patientId)

  return (
    <div>
      <h1>Detail Patient</h1>
    </div>
  )
}
