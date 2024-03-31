import { FormType } from '@/common/type/form.type';
import FormProvider from '@/contexts/form.context';
import Form from './form.form';

export default function FormHolder({
  form,
}: {
  form: FormType;
  onClose: () => void;
}) {
  return (
    <FormProvider>
      <Form form={form} />
    </FormProvider>
  );
}
