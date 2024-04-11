import { REQUEST_PATH } from '@/common/constant/api.constant';
import { PostAdminFindItemType } from '@/common/type/post.type';
import DialogComponent from '@/components/dialog';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import useRequest from '@/hooks/useRequestApi.hook';
import { ReactNode } from 'react';

export default function DialogDeletePost({
  post,
  trigger,
  onSuccess,
}: {
  post?: PostAdminFindItemType;
  trigger: ReactNode;
  onSuccess: () => void;
}) {
  const { del } = useRequest();
  const { toast } = useToast();
  const deletePost = async (post: PostAdminFindItemType | undefined) => {
    if (!post) return false;
    const res = await del({
      path: REQUEST_PATH.post.deleteOne(),
      query: [
        {
          key: 'id',
          value: post.id,
        },
      ],
      token: true,
    });

    if (res) {
      toast({
        title: 'Deleted successfully',
        description: 'Deleted 1 post, reloaded table.',
      });
      onSuccess();
    }
  };

  return (
    <DialogComponent trigger={trigger} title='Delete this Category' description='By confirm this action will delete this post.'>
      <DialogFooter>
        <DialogClose>
          <div className='flex gap-2'>
            <Button variant={'outline'}>Close</Button>
            <Button
              onClick={() => {
                deletePost(post);
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
