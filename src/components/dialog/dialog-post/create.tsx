import PostForm from '@/components/form/post';
import { ReactNode } from 'react';
import DialogComponent from '..';

export default function DialogCreatePost({ trigger, onSuccess }: { trigger: ReactNode; onSuccess: () => void }) {
  return (
    <DialogComponent trigger={trigger} title='Create a Post' description='Enter requied field to create new post.'>
      <PostForm onSuccess={onSuccess} mainClassName='h-[500px]' />
    </DialogComponent>
  );
}
