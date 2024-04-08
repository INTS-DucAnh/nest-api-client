import { REQUEST_PATH } from '@/common/constant/api.constant';
import { PostFindItemType } from '@/common/type/post.type';
import { MostLikeResult } from '@/common/type/result.type';
import useRequest from '@/hooks/useRequestApi.hook';
import { useEffect, useState } from 'react';
import DialogPostDetail from '../dialog/dialog-post/view';
import PostCard from '../post-card';
import { Button } from '../ui/button';

export default function HomeMostLike() {
  const [mostLike, SetMostLike] = useState<PostFindItemType[]>([]);
  const [loading, SetLoading] = useState<boolean>(true);
  const { get } = useRequest();

  const getMostLike = async () => {
    SetLoading(true);
    const res = await get<MostLikeResult>({
      token: true,
      path: REQUEST_PATH.post.mostLike(),
    });

    SetLoading(false);
    if (res) {
      SetMostLike([...res.result, ...res.result, ...res.result, ...res.result, ...res.result]);
    }
  };

  useEffect(() => {
    getMostLike();
  }, []);

  return (
    <div className='w-full py-20 px-[15%] max-xl:px-[5%] h-fit'>
      <div className='w-full h-fit flex justify-between items-start'>
        <div className='w-fit h-fit'>
          <h1 className='text-[3rem] font-bold w-[200px] h-fit relative text-left leading-[50px]'>Trending Posts</h1>
          <p className='text-muted-foreground w-96 text-left'>Post that have many like and comment in system.</p>
        </div>
        <div>
          <Button variant={'outline'}>View more</Button>
        </div>
      </div>
      <div className='w-full grid grid-cols-5 grid-rows-1 gap-8 max-2xl:gap-2 mt-5'>
        {mostLike.length ? (
          mostLike.map((post: PostFindItemType) => (
            <div key={post.id} className=' odd:duration-75 odd:mt-[35px] even:mb-[35px] odd:hover:mt-[25px]'>
              <DialogPostDetail
                id={post.id}
                trigger={
                  <Button variant={'outline'} className='w-full h-full p-0 rounded-lg'>
                    <PostCard post={post} />
                  </Button>
                }
              />
            </div>
          ))
        ) : (
          <p>There are no most like posts</p>
        )}
      </div>
    </div>
  );
}
