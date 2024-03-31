import { FormTypeEnum } from '@/common/enum/form.enum';
import { FormType } from '@/common/type/form.type';
import FormSection from '@/components/form/section.form';
import { FormContext, FormContextType } from '@/contexts/form.context';
import { useContext, useState } from 'react';
import useRequest from './useRequestApi.hook';

export default function useForm() {
  const { data, handleChange, set, reset } =
    useContext<FormContextType>(FormContext);
  const { post, put, del } = useRequest();
  const [form, SetForm] = useState<FormType>({
    label: '',
    type: FormTypeEnum.UPDATE,
    section: [],
  });
  const [loading, SetLoading] = useState<boolean>(false);

  const MapTypeToMethod = {
    [FormTypeEnum.CREATE]: post,
    [FormTypeEnum.UPDATE]: put,
    [FormTypeEnum.DELETE]: del,
  };

  const onSubmit = () =>
    MapTypeToMethod[form.type]({
      body: data,
      headers: {
        'Content-type': 'application/json',
      },
      path: '',
      credentials: true,
    });

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    SetLoading(true);

    const res = await onSubmit();
    SetLoading(false);
  };

  const Form = ({ form, onClose }: { form: FormType; onClose: () => void }) => {
    SetForm(form);
    return (
      <form onSubmit={(e) => onSubmitForm(e)}>
        <div>
          {form.type} {form.label}
        </div>
        <div>
          {form.section &&
            form.section.map((st) => (
              <FormSection
                key={st.label}
                fields={st.fields}
                require={st.require}
                label={st.label}
              />
            ))}
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}>
            Cancel
          </button>
          <div>
            <input type="submit" value={'Confirm'} />
            {loading && <p>Loading</p>}
          </div>
        </div>
      </form>
    );
  };

  return { Form, data };
}
