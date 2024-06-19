import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { BsLayoutTextWindow } from 'react-icons/bs'
import { Badge } from '../ui/badge'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { Skeleton } from '../ui/skeleton'
import { useNavigate } from 'react-router-dom'
import { ListX } from 'lucide-react'

export interface TableDefsProps {
  tableRowKey: string
  tableColumnName: string
  tableColumnType: 'detail' | 'text' | 'active' | 'cpf' | 'cnpj'
}

interface TableSimpleProps<T> {
  listData?: T[]
  isFetiching: boolean
  tableDefs?: TableDefsProps[]
}

export function TableSimple<T>({
  listData,
  isFetiching,
  tableDefs,
}: TableSimpleProps<T>) {
  const navigate = useNavigate()
  return (
    <div>
      {!isFetiching && listData?.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full my-24">
          <ListX size={82} />
          <p className="font-bold text-2xl">Nenhum dado encontrado!</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {tableDefs?.map((def, index) => (
                <TableHead key={index} className="text-center">
                  {def.tableColumnName}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetiching ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <TableRow key={index}>
                      {Array.from({ length: tableDefs?.length ?? 0 }).map(
                        (_, index) => {
                          return (
                            <TableCell className="font-medium" key={index}>
                              <div className="flex justify-center">
                                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                              </div>
                            </TableCell>
                          )
                        },
                      )}
                    </TableRow>
                  )
                })}
              </>
            ) : (
              <>
                {listData?.map((item: any, index) => {
                  return (
                    <TableRow key={index}>
                      {tableDefs?.map((def) => {
                        switch (def.tableColumnType) {
                          case 'cnpj':
                            return (
                              <TableCell
                                key={def.tableRowKey}
                                className="font-medium text-center"
                              >
                                {cnpj.format(item[def.tableRowKey])}
                              </TableCell>
                            )
                          case 'cpf':
                            return (
                              <TableCell
                                key={def.tableRowKey}
                                className="font-medium text-center"
                              >
                                {cpf.format(item[def.tableRowKey])}
                              </TableCell>
                            )
                          case 'detail':
                            return (
                              <TableCell
                                key={def.tableRowKey}
                                className="flex justify-center"
                              >
                                <BsLayoutTextWindow
                                  className="cursor-pointer"
                                  size={24}
                                  onClick={() => navigate(`detail/${item.id}`)}
                                />
                              </TableCell>
                            )
                          case 'text':
                            return (
                              <TableCell
                                key={def.tableRowKey}
                                className="font-medium text-center"
                              >
                                {item[def.tableRowKey]}
                              </TableCell>
                            )
                          case 'active':
                            return (
                              <TableCell
                                key={def.tableRowKey}
                                className="text-center"
                              >
                                {item[def.tableRowKey] ? (
                                  <Badge
                                    className="w-11 rounded-3xl"
                                    variant="destructive"
                                  >
                                    <IoCloseCircleOutline size={24} />
                                  </Badge>
                                ) : (
                                  <Badge
                                    className="w-11 rounded-3xl"
                                    variant="success"
                                  >
                                    <IoCheckmarkCircleOutline size={24} />
                                  </Badge>
                                )}
                              </TableCell>
                            )
                          default:
                            return (
                              <TableCell
                                key={def.tableRowKey}
                                className="font-medium text-center"
                              >
                                {item[def.tableRowKey]}
                              </TableCell>
                            )
                        }
                      })}
                    </TableRow>
                  )
                })}
              </>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
