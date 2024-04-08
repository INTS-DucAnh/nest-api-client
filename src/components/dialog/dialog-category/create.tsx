import CategoryForm from '@/components/form/category';
import { ReactNode } from 'react';
import DialogComponent from '..';

export default function DialogCreateCategory({ trigger, onSuccess }: { trigger: ReactNode; onSuccess: () => void }) {
  return (
    <DialogComponent trigger={trigger} title='Create a Category' description="Enter category's name and create.">
      <CategoryForm onSuccess={onSuccess} />
    </DialogComponent>
  );
}
