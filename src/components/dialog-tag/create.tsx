import { ReactNode } from 'react';
import DialogComponent from '../dialog';
import TagForm from '../form/tag';

export default function DialogCreateTag({ trigger }: { trigger: ReactNode }) {
  return (
    <DialogComponent
      trigger={trigger}
      title="Create a Tag"
      description="Enter tag's name and create.">
      <TagForm />
    </DialogComponent>
  );
}
