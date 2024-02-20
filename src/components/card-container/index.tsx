import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { IoMdPeople } from 'react-icons/io'
import { PiExamFill } from 'react-icons/pi'
import { LuBookOpenCheck } from 'react-icons/lu'
import { GiExitDoor } from 'react-icons/gi'

export function CardContainer() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      <Card className="max-h-36">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            Pacientes
            <IoMdPeople className="text-3xl" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            +{Math.floor(Math.random() * 1000)}
          </p>
        </CardContent>
      </Card>

      <Card className="max-h-36">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            Consultas em aberto
            <LuBookOpenCheck className="text-3xl" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            +{Math.floor(Math.random() * 1000)}
          </p>
        </CardContent>
      </Card>

      <Card className="max-h-36">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            Exames solicitados
            <PiExamFill className="text-3xl" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            +{Math.floor(Math.random() * 1000)}
          </p>
        </CardContent>
      </Card>

      <Card className="max-h-36">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            Consultas de retorno
            <GiExitDoor className="text-3xl" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            +{Math.floor(Math.random() * 1000)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
