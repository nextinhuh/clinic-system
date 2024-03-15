import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getActualDate } from '@/utils/parse'
import { useNavigate } from 'react-router-dom'

export function Patient() {
  const navigate = useNavigate()

  function handleCreatePatient() {
    navigate('/patient/create')
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pacientes</h1>
        <p className="text-[10px] mt-2 sm:text-xs sm:mt-0">
          Atualizado em: {getActualDate()}
        </p>
      </div>

      <div className="w-[100%] border rounded-lg p-8 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold mb-4">Lista das últimas consultas</h1>
          <Button onClick={handleCreatePatient} variant="outline">
            Adicionar paciente
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data da consulta</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Qtd. retorno</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">20/02/2024</TableCell>
              <TableCell>Aguardando retorno</TableCell>
              <TableCell>2</TableCell>
              <TableCell className="text-right">R$ 250,00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
