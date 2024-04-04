import SignupForm from '@/components/form/signup';
import { BracesIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SignupRoute() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full">
      <div className="flex-1 bg-muted relative">
        <img
          alt="login"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1637963953070-e0f3d08da3c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        
        <div className='absolute w-full h-full flex flex-col p-16 box-border bg-transparent top-0 left-0 text-muted-foreground justify-between'>
          <div className='flex gap-3 items-center'>
            <BracesIcon className='w-8 h-8'/>
            <p className=' text-2xl font-semibold'>NestJS API</p>
          </div>

          <div className=' block text-left'>
            <p className='text-lg'>
              “Welcome to our interactive blog! Engage with posts, comment, view, and manager. Join the system and connect with others as we explore diverse topics together.”
            </p>
            <p className='mt-3 text-sm'>INTS NestJS</p>
          </div>
        </div>
      </div>
      <div className="flex-1 grid place-items-center">
        <div className="w-fit h-fit m-auto">
          <div className="grid gap-2 text-center mb-10">
            <h1 className="text-3xl font-bold test">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your infomation below to create to your account
            </p>
          </div>
          <SignupForm onSuccess={() => {navigate('/')}}/>
        </div>
      </div>
    </div>
  );
}
