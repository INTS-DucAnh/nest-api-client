import { FormField } from '@/common/type/form.type';

export default function RenderFormField({ fields }: { fields: FormField[] }) {
  return (
    <div className="flex flex-row gap-2">
      {fields.map((field: FormField) => {
        const Component = field.component;
        return (
          <div key={field.label}>
            <label
              htmlFor={field.label}
              style={{ textTransform: 'capitalize' }}>
              {field.label}
            </label>
            {field.require && <span style={{ color: 'red' }}>*</span>}
            <Component id={field.label} />
          </div>
        );
      })}
    </div>
  );
}
