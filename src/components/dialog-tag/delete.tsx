import { REQUEST_HOST, REQUEST_PATH } from '@/common/constant/api.constant';
import { TagFindItemType, TagType } from '@/common/type/tag.type';
import DialogComponent from '@/components/dialog';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import useRequest from '@/hooks/useRequestApi.hook';
import { ReactNode } from 'react';

export default function DialogDeleteTag({
  tag,
  trigger,
}: {
  tag?: TagFindItemType;
  trigger: ReactNode;
}) {
  const { del } = useRequest();
  const deleteTag = async (tag: TagType | undefined) => {
    if (!tag) return false;
    del({
      path: `${REQUEST_HOST}/${REQUEST_PATH.tag.base}/`,
      headers: {},
    });
  };
  return (
    <DialogComponent
      trigger={trigger}
      title="Delete this tag"
      description="By confirm this action will delete this tag.">
      <DialogFooter>
        <DialogClose>
            <div className="flex gap-2 mt-5">
              <Button variant={'outline'}>Close</Button>
              <Button
                onClick={() => {
                  deleteTag(tag);
                }}>
                Confirm
              </Button>
            </div>
        </DialogClose>
      </DialogFooter>
    </DialogComponent>
  );
}
