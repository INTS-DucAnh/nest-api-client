import { TagFindItemType } from '@/common/type/tag.type';
import { ReactNode } from 'react';
import TagForm from '../../form/tag';
import SheetComponent from '../../ui/sheet';

export default function DialogUpdateTag({ trigger, tag, onSuccess }: { tag: TagFindItemType; trigger: ReactNode; onSuccess: () => void }) {
  return (
    <SheetComponent trigger={trigger} title='Update a Tag' description='Update tag will update all tag attached to posts.'>
      <TagForm tag={tag} onSuccess={onSuccess} />
    </SheetComponent>
  );
}
