import { DotIcon } from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio';

type UserAboutUsType = {
  name: string;
  avatar: string;
  mission: string[];
  role: 'Supporter' | 'Main';
  major: 'Backend' | 'Frontend';
};
const UserAboutUs: UserAboutUsType[] = [
  {
    name: 'Duc Anh',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJDsM6TaSQkOzZ4kvj7WC-jC9tIEBUgy1RiL1GjgMf56-mmGA=s288-c-no',
    mission: ['Tag', 'PostTag', 'Category', 'PostCategory', 'Frontend'],
    role: 'Main',
    major: 'Backend',
  },
  {
    name: 'Duong',
    avatar: 'https://appdata.chatwork.com/avatar/d75BjXjZM2.png',
    role: 'Main',
    mission: ['Exception Filter', 'Intercepter', 'Migration Seeder', 'User', 'Post', 'Token', 'Like', 'Comment'],
    major: 'Backend',
  },
  {
    name: 'Thai',
    avatar: 'https://appdata.chatwork.com/avatar/6MoPGkrxq8.jpg',
    role: 'Supporter',
    mission: ['PostDetail Component', 'DialogPostDetail Component'],
    major: 'Frontend',
  },
];

function RenderListMission({ mission }: { mission: string[] }) {
  return (
    <>
      {mission.map(miss => (
        <>
          <p className=' line-clamp-1 text-nowrap text-sm text-muted-foreground mx-1 hover:text-foreground cursor-default' key={miss}>
            {miss}
          </p>
          <DotIcon className='w-4 h-4 text-muted-foreground' />
        </>
      ))}
    </>
  );
}

export default function HomeAboutUs() {
  return (
    <div className='w-full py-20 px-[15%] max-xl:px-[5%] h-fit'>
      <div className='w-fit h-fit mx-auto'>
        <h1 className='text-[3rem] font-bold w-fit h-fit relative text-center leading-[50px]'>About Us</h1>
        <p className='text-muted-foreground w-fit text-left'>What did we do in this project.</p>
      </div>
      <div className='w-full flex items-start gap-16 max-2xl:gap-2 mt-10 justify-center'>
        {UserAboutUs.map(user => (
          <div key={user.name} className='h-fit w-[250px]'>
            <div className=' w-48 mx-auto'>
              <div className='box-border p-2 border rounded-full'>
                <div className='rounded-full overflow-hidden'>
                  <AspectRatio ratio={1 / 1}>
                    <img alt='staff' src={user.avatar} className='w-full h-full object-cover' />
                  </AspectRatio>
                </div>
              </div>

              <p className='mt-2 font-semibold'>{user.name}</p>
              <p className='text-xs text-muted-foreground mb-2'>
                {user.role} {user.major}
              </p>
            </div>
            <div className='w-full h-fit overflow-hidden'>
              <div className='w-fit animate-infinity-horizon-scroll flex items-center justify-center'>
                <RenderListMission mission={user.mission} />
                <RenderListMission mission={user.mission} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
