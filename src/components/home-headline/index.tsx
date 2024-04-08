import { ArrowRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function HomeHeadline() {
  const navigate = useNavigate();

  return (
    <div className='w-full h-fit py-56 relative'>
      <div className='absolute top-0 left-0 w-full h-full z-[0] backdrop-blue-sm'></div>
      <div className='z-[1] relative w-[900px] mx-auto'>
        <div>
          <h1 className='text-[4rem] font-semibold text-foreground tracking-normal drop-shadow-[0_10px_35px_rgba(0,0,0,1)] dark:drop-shadow-[0_10px_35px_rgba(255,255,255,0.7)] flex w-fit mx-auto items-end gap-1'>
            Engage: View & Comment<div className='cursor animate-cursor'></div>
          </h1>
          <p className=' text-muted-foreground my-5 relative'>
            Unlock the power of interaction! Dive into posts, express your thoughts, and engage with the community through comments. Join
            the conversation, share insights, and connect with like-minded individuals in a vibrant online community.
            <div className='w-2 h-2 bg-primary rounded-full overflow-hidden animate-ping absolute bottom-4 right-0'></div>
          </p>
        </div>
        <div className='flex gap-2 w-fit mx-auto mt-10'>
          <Button>
            Get Started <ArrowRightIcon className='w-3 h-3 ml-2' />
          </Button>
          <Button
            variant={'outline'}
            onClick={() => {
              navigate('/');
            }}
          >
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
