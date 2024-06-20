import { TableDefsProps } from '@/components/table-simple'

export const scheduleTableDefs: TableDefsProps[] = [
  {
    tableRowKey: 'patientName',
    tableColumnName: 'Nome',
    tableColumnType: 'text',
  },
  {
    tableRowKey: 'date',
    tableColumnName: 'Data',
    tableColumnType: 'date',
  },
  {
    tableRowKey: 'consultId',
    tableColumnName: 'Status',
    tableColumnType: 'scheduleStatus',
  },
  {
    tableRowKey: 'details',
    tableColumnName: 'Detalhes',
    tableColumnType: 'customDetail',
  },
]
