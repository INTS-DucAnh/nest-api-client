import { createContext, ReactNode, useState } from 'react';

export interface FormContextType {
  data: object;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  set: (data: object) => void;
}

export const FormContext = createContext<FormContextType>({
  data: {},
  handleChange: () => null,
  reset: () => null,
  set: () => null,
});

export default function FormProvider({ children }: { children: ReactNode }) {
  const [data, SetData] = useState<object>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    SetData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const reset = (): void => {
    SetData({});
  };

  const set = (data: object): void => {
    SetData(data);
  };

  const contextValue: FormContextType = {
    data: data,
    handleChange,
    set,
    reset,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}
