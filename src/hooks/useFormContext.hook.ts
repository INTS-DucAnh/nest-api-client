import { useContext } from 'react';
import { FormContext, FormContextType } from '../contexts/form.context';

export default function useFormContext() {
  const { data, handleChange, reset, set } =
    useContext<FormContextType>(FormContext);

  return { data, handleChange, reset, set };
}
