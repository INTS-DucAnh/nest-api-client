import { FormSections } from '@/common/type/form.type';
import RenderFormField from './field.form';

export default function FormSection(param: FormSections) {
  return (
    <div>
      <p>{param.label}</p>
      {param.description && <p>{param.description}</p>}
      {param.fields.map((fields) => (
        <RenderFormField key={new Date().toISOString()} fields={fields} />
      ))}
    </div>
  );
}
