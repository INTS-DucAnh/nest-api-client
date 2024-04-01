import { FieldValues } from 'react-hook-form';

export interface LoginFormType extends FieldValues {
  username: string;
  password: string;
}
