import { FieldValues } from 'react-hook-form';

export type FormMethodType = 'create' | 'update';
export interface LoginFormType extends FieldValues {
  username: string;
  password: string;
}
