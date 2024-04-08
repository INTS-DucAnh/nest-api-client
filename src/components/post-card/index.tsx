import { DateFormat, SeparateSecondary, Time24Format } from '@/common/constant/date.constant';
import { DateFormatType } from '@/common/type/date.type';
import { PostFindItemType } from '@/common/type/post.type';
import FormatDate from '@/lib/date-format.lb';
import { Card } from '../ui/card';
import UserInfo from '../user-info/user-info';

export default function PostCard({ post }: { post: PostFindItemType }) {
  return (
    <div className=' rounded-xl w-full p-0 hover:border-gray-500 h-fit max-h-80 cursor-pointer'>
      <div className='p-4 height w-full h-fit max-h-80'>
        <div className='w-full h-fit py-2 flex items-center justify-between'>
          <div>
            {post.user && (
              <UserInfo user={post.user}>
                <p className='text-xs'>{post.user.avatar}</p>
              </UserInfo>
            )}
          </div>
          <p className='text-[0.7rem] text-muted-foreground w-full text-left'>
            Update: {FormatDate({ time: post.updatedDate, format: `${DateFormat} ${SeparateSecondary} ${Time24Format}` as DateFormatType })}
          </p>
        </div>
        <div>
          <p className='w-full h-fit break-words text-wrap text-left font-semibold text-xl'>{post.title}</p>
          <p className='text-ellipsis overflow-hidden text-xs text-muted-foreground break-words line-clamp-4 text-left w-full'>
            {post.content}
          </p>
          <Card className='overflow-hidden w-full mt-2'>
            <div className=' w-full aspect-video'>
              <img
                className='w-full h-full object-cover'
                alt='mostlike pic'
                src={post.thumbnail || 'https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg'}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
