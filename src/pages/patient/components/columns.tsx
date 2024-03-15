import { PatientData } from '@/utils/types'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<PatientData>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
]
