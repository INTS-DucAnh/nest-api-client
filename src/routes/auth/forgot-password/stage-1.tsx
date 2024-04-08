import { REQUEST_PATH } from '@/common/constant/api.constant';
import { ValidEmailFormat } from '@/common/schema/base.schema';
import { FindUserByEmailResult, SendOTPResult } from '@/common/type/result.type';
import { FindUserByEmail } from '@/common/type/user.type';
import AvatarComponet from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { ForgotPasswordContext, ForgotPasswordContextType } from '@/contexts/forgot-password.context';
import useRequest from '@/hooks/useRequestApi.hook';
import { LoaderCircleIcon, UserRoundIcon } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';

export default function EmailSelectStage({className, onSuccess} :  {className: string, onSuccess: ()=> void}) {
  const {data, changeData} = useContext<ForgotPasswordContextType>(ForgotPasswordContext);
  const [listSuggest, SetListSuggest] = useState<FindUserByEmail[]>([]);
  const [email, SetEmail] = useState<string>(data.email);
  const [delay, SetDelay] = useState<number>(500);
  const [openSugg, SetOpenSugg] = useState<boolean>(false);
  const [loadingSugg, SetLoadingSugg] = useState<boolean>(false);
  const [loadingSend, SetLoadingSend] = useState<boolean>(false);
  const suggRef = useRef<HTMLDivElement>(null);
  const { get, post } = useRequest();

  const resetSuggest = () => {
    SetListSuggest([]);
    SetLoadingSugg(false);
    SetOpenSugg(false);
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    SetEmail(event.target.value);

    if(!event.target.value) resetSuggest();
    else {
      !openSugg && SetOpenSugg(true);
      !loadingSugg && SetLoadingSugg(true);
    }
  }

  const sendOtp = async () => {
    SetLoadingSend(true);
    const res = await post<SendOTPResult>({
      path: REQUEST_PATH.user.sendOTP(),
      body: {
        email: email,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    SetLoadingSend(false);
    if(res && typeof res !== 'boolean') {
      toast({
        title: 'Send OTP successfully',
        description: 'OTP have been sent to your email',
      });
      changeData('otpExpire', res.result.expired);
      changeData('otp', '');
      onSuccess();
    }

  }

  const getSuggest = async (email: string) => {
    const res = await get<FindUserByEmailResult>({
      path: REQUEST_PATH.user.getByEmail(),
      query: [
        {key: 'email', value: email},
      ],
      log: false,
    })

    SetLoadingSugg(false);
    if(res && typeof res !== 'boolean') {
      SetListSuggest(res.result);
    }
    else {
      SetListSuggest([]);
    }
  }

  useEffect(() => {
    const listenerSuggRef = (event: MouseEvent) => {
      if (suggRef.current && !suggRef.current.contains(event.target as Node)) {
        resetSuggest();
      }
    };
    document.addEventListener('click', listenerSuggRef);
    const handler = setTimeout(async () => {
      if(email) {
        await getSuggest(email);
      }
    }, delay);


    return () => {
      document.removeEventListener('click', listenerSuggRef);
      clearTimeout(handler);
    };
  }, [email]);

  return (
  <div className={`${className} relative flex flex-col items-start`}>
    <div className='flex w-full items-center flex-1 gap-2' >
      <div className='flex-1'>
        <Input 
          placeholder='Email' 
          onChange={handleChangeEmail} 
          value={email} 
          autoComplete='off'
          className='w-full'
          />     
          
        {openSugg && 
          <Card ref={suggRef} className='w-full h-fit p-3 absolute top-10 z-10'>
            <ScrollArea className='w-full max-h-96 h-fit'>
            {
              !loadingSugg ?
                (listSuggest.length !== 0 ? 
                  listSuggest.map(sugg => (
                    <Button 
                      key={sugg.id} 
                      variant='ghost' 
                      className='w-full p-2 box-content justify-start gap-2 text-muted-foreground hover:text-foreground'
                      onClick={() => {
                        SetOpenSugg(false);
                        SetEmail(sugg.email);
                        changeData('email', sugg.email);
                      }}
                    >
                      <div>
                        <AvatarComponet
                          className="bg-transparent w-9 h-9"
                          src={sugg.avatar || ''}
                          alt="user"
                          fallback={<UserRoundIcon className=" h-5 w-5" />}
                        />
                      </div>
                      <div className='flex-1'>
                        <p className='w-full text-left text-xs'>{sugg.name}</p>
                        <p className='w-full text-left text-xs'>{sugg.email}</p>
                      </div>
                    </Button>
                  )) : 
                  (<div className='w-fit m-auto flex items-center gap-2 py-2 text-muted-foreground'>
                    <p className='w-fit text-center text-sm'>No result found.</p>
                  </div>)   
                ) : 
                (<div className='w-fit m-auto flex items-center gap-2 py-2 text-muted-foreground'>
                  <LoaderCircleIcon className='w-4 h-4 animate-spin' />
                  <p className='w-fit text-center text-sm'>Finding user...</p>
                </div>)
            }  
            </ScrollArea>   
          </Card>}      
      </div>
 
      <Button 
        onClick={sendOtp} 
        disabled={ loadingSend || !ValidEmailFormat(email) } 
        variant={loadingSend ? 'outline' : 'default'}
        className='w-fit'
      >
        {
          loadingSend ? (<><LoaderCircleIcon className='w-3 h-3 animate-spin mr-2'/> Sending OTP to {email}</>):
          (<p>Send OTP</p>)
        }
      </Button>   
    </div>
    
    <div className='w-full mt-3 flex gap-3 items-start'>
      {email && 
            !ValidEmailFormat(email) && 
            <p className='text-xs text-destructive mt-2'>Email is not valid format. <br/> Ex: example@gmail.com</p>} 
    </div>
  </div>)
}