import { ReactNode } from 'react';
import DialogComponent from '..';
import TagForm from '../../form/tag';

export default function DialogCreateTag({ trigger, onSuccess }: { trigger: ReactNode; onSuccess: () => void }) {
  return (
    <DialogComponent trigger={trigger} title='Create a Tag' description="Enter tag's name and create.">
      <TagForm onSuccess={onSuccess} />
    </DialogComponent>
  );
}
