import { FormTypeEnum } from '../enum/form.enum';

export interface FormOptionsType {
  key?: string;
}

export interface BaseFormComponent {
  label: string;
  description?: string;
}

export interface FormComponentRequire extends BaseFormComponent {
  require: boolean;
}

export interface FormField extends FormComponentRequire {
  error: FieldError[];
  component: (props: React.HTMLAttributes<HTMLElement>) => React.ReactElement;
}

export interface FormSections extends FormComponentRequire {
  fields: Array<FormField[]>;
}

export interface FormType extends BaseFormComponent {
  type: FormTypeEnum;
  section: FormSections[];
}

export type FieldError = {
  field: string;
  message?: string;
};
