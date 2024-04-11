import { PostAdminFindItemType } from '@/common/type/post.type';
import PostForm from '@/components/form/post';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReactNode } from 'react';
import SheetComponent from '../../ui/sheet';

export default function DialogUpdatePost({
  trigger,
  post,
  onSuccess,
}: {
  post: PostAdminFindItemType;
  trigger: ReactNode;
  onSuccess: () => void;
}) {
  return (
    <SheetComponent trigger={trigger} title='Update a Tag' description='Update tag will update all tag attached to posts.'>
      <ScrollArea className='w-full h-full mt-3'>
        <div>
          <PostForm posts={post} onSuccess={onSuccess} />
        </div>
      </ScrollArea>
    </SheetComponent>
  );
}
