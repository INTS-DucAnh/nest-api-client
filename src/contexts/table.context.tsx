import { createContext, ReactNode, useState } from 'react';

export type TableContextType = {
  reload: boolean,
  SetReloadTable: (value: boolean) => void
}

export const TableContext = createContext<TableContextType>({
  reload: false,
  SetReloadTable: (value: boolean) => null,
});

export default function TableProvider({children}: {children: ReactNode}) {

  const [reloadData, SetReloadData] = useState<boolean>(true)

  const SetReloadTable = (value: boolean) => {
    SetReloadData(value);
  }
  const valueProvider:TableContextType = {
    reload: reloadData,
    SetReloadTable,
  }
  return (
  <TableContext.Provider value={valueProvider}>
    {children}
  </TableContext.Provider>)
}