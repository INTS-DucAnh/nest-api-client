import { TagType } from '@/common/type/tag.type';
import DialogComponent from '@/components/dialog';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ReactNode } from 'react';

export default function DialogDeleteTag({
  tag,
  trigger,
}: {
  tag?: TagType;
  trigger: ReactNode;
}) {
  return (
    <DialogComponent
      trigger={trigger}
      title="Delete this tag"
      description="By confirm this action will delete this tag.">
      <DialogFooter>
        <DialogClose>
          <Separator />
          <div className="flex gap-2 mt-5">
            <Button variant={'outline'}>Close</Button>
            <Button>Confirm</Button>
          </div>
        </DialogClose>
      </DialogFooter>
    </DialogComponent>
  );
}
