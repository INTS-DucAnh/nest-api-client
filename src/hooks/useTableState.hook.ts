import { useState } from 'react';

export interface TableState {
  page: number, 
  size: number,
  total: number,
  fetching: boolean,
}

export default function useTableState<T extends TableState>(initValue: T) {
  const [state, SetState] = useState<T>(initValue);

  const SetTableState = (newState: Partial<T>) => {
    SetState(prevState => ({
      ...prevState,
      ...newState,
    }));
  };

  return {state, SetTableState}
}