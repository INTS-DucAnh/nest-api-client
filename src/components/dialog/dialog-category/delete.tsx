import { REQUEST_PATH } from '@/common/constant/api.constant';
import { CategoryFindItemType } from '@/common/type/category.type';
import { TagFindItemType } from '@/common/type/tag.type';
import DialogComponent from '@/components/dialog';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import useRequest from '@/hooks/useRequestApi.hook';
import { ReactNode } from 'react';

export default function DialogDeleteCategory({
  category,
  trigger,
  onSuccess,
}: {
  category?: CategoryFindItemType;
  trigger: ReactNode;
  onSuccess: () => void;
}) {
  const { del } = useRequest();
  const deleteCategory = async (tag: TagFindItemType | undefined) => {
    if (!tag) return false;
    const res = await del({
      path: REQUEST_PATH.category.deleteOne(),
      param: tag.id,
      headers: {},
      token: true,
    });

    if (res) {
      onSuccess();
    }
  };

  return (
    <DialogComponent trigger={trigger} title='Delete this Category' description='By confirm this action will delete this category.'>
      <DialogFooter>
        <DialogClose>
          <div className='flex gap-2 mt-5'>
            <Button variant={'outline'}>Close</Button>
            <Button
              onClick={() => {
                deleteCategory(category);
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogClose>
      </DialogFooter>
    </DialogComponent>
  );
}
