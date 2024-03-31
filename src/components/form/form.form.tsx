import { FormType } from '@/common/type/form.type';
import useForm from '@/hooks/useForm.hook';

export default function Form({ form }: { form: FormType }) {
  const { Form } = useForm();
  const onClose = () => {
    console.log('close');
  };

  return <Form onClose={onClose} form={form} />;
}
