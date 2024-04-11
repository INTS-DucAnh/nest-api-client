import { FAKE_POST } from '@/common/constant/fake.costant';
import { PostDetailType } from '@/common/type/post.type';
import PostDetail from '@/components/post-detail';
import { ReactNode, useEffect, useState } from 'react';
import DialogComponent from '..';
import DialogComponentDetail from '@/components/dialog-detail';

export default function DialogPostDetail({ id, trigger }: { id: string; trigger: ReactNode }) {
  const [post, SetPost] = useState<PostDetailType>();

  const fakeApi = (): Promise<PostDetailType> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const fakeData: PostDetailType = FAKE_POST;
        res(fakeData);
      }, 500);
    });
  };

  const getDetail = async () => {
    //em fake call api nhe
    const res: PostDetailType = await fakeApi();
    SetPost(res);

    console.log(res);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <DialogComponent title='Post Detail' trigger={trigger}>
      {post && <PostDetail post={post} />}
    </DialogComponentDetail>
  );
}
