import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react'
import StageForgotPassword from './stage';
import ToolTip from '@/components/ui/tooltip';
import { KeyRoundIcon, LockKeyholeIcon, MailIcon } from 'lucide-react';
import EmailSelectStage from './stage-1';
import OTPValidationStage from './stage-2';

type Stage = {
  stage: number,
  tooltip: string,
  content: React.FC<{className: string}>
  title: string,
  description: string,
  component: React.FC<{className: string, onSuccess: () => void}>
}


const stages: Stage[] = [
  {
    stage: 1,
    tooltip: 'Enter your email',
    content: ({className}: {className: string}) => {
      return <MailIcon className={className}/>;
    },   
    title: 'Enter your Email',
    description: 'Enter your email and select which account is belong to you.',
    component: ({className, onSuccess}: {className: string, onSuccess: () => void}) => 
      <EmailSelectStage className={className} onSuccess={onSuccess}/>,
  },
  {
    stage: 2,
    tooltip: 'OTP validation',
    content: ({className}: {className: string}) => {
      return <LockKeyholeIcon className={className}/>;
    }, 
    title: 'OTP Validation',
    description: 'OTP have been sent to your email, please check and type 6 digits to form bellow',
    component: ({className, onSuccess}: {className: string, onSuccess: () => void}) => 
      <OTPValidationStage className={className} onSuccess={onSuccess}/>,
  },
  {
    stage: 3,
    tooltip: 'Reset password',
    content: ({className}: {className: string}) => {
      return <KeyRoundIcon className={className}/>;
    }, 
    title: 'string',
    description: 'string',
    component: ({className, onSuccess}: {className: string, onSuccess: () => void}) => 
      <EmailSelectStage className={className} onSuccess={onSuccess}/>,
  },
]

export default function ForgotPasswordRoute() {
  const [currStage, SetCurrStage] = useState<number>(1); 
  const [dir, SetDir] = useState<number>(1);

  return(
    <section className='w-fit h-full py-16 mx-auto overflow-hidden flex flex-col items-center'>
      <div className='flex w-fit items-center justify-center gap-3'>
        {stages.map((stage, i) => {
          const Component = stage.content;
          return (
          <>
          <div key={stage.title}>
            <ToolTip 
              trigger={
              <Button 
                disabled={stage.stage !== currStage}
                variant={currStage === stage.stage ? 'default' :'outline'}
                size='icon' 
                onClick={() => {
                  if(stage.stage !== currStage) {
                    SetCurrStage(stage.stage);
                    SetDir(currStage - stage.stage)
                  }
                }}
                className='rounded-full'>
                <Component className='w-3 h-3'/>
              </Button>}
              text={stage.tooltip} 
              dur={2} 
              side={'bottom'}          
              />
          </div>
          {i!== stages.length -1 && <div className=' w-28 border-[1px]'/>}
          </>)
        })} 
      </div>
      <div className='w-[500px] h-fit mt-10'>
        <StageForgotPassword 
        dir={dir}
        stage={currStage} 
        title={stages[currStage-1].title}
        description={stages[currStage-1].description}
        Component={stages[currStage-1].component}
        onSuccess={() => {
          SetCurrStage(curr => curr+1)
        }}/>
      </div>
    </section>
  )
}