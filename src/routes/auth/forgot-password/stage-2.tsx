import { REQUEST_PATH } from '@/common/constant/api.constant';
import { CheckOTPResult, SendOTPResult } from '@/common/type/result.type';
import { Button } from '@/components/ui/button';
import InputOTPComponent from '@/components/ui/input-otp';
import { useToast } from '@/components/ui/use-toast';
import { ForgotPasswordContext, ForgotPasswordContextType } from '@/contexts/forgot-password.context';
import useRequest from '@/hooks/useRequestApi.hook';
import { LoaderCircleIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';

export default function OTPValidationStage({className, onSuccess}: {className: string, onSuccess: () => void}) {
  const {data, changeData} = useContext<ForgotPasswordContextType>(ForgotPasswordContext);
  const [secondRemain, SetSecondRemain] = useState<number>(Math.floor(data.otpExpire - new Date().getTime()/1000));
  const [callAPI, SetCallAPI] = useState<boolean>(true);
  const [otp, SetOtp] = useState<string>(data.otp)
  const [resending, SetResending] = useState<boolean>(false);
  const [checkingOTP, SetCheckingOTP] = useState<boolean>(false);
  const { post } = useRequest();
  const {toast} = useToast();
  
  const sendOtp = async () => {
    SetResending(true);
    const res = await post<SendOTPResult>({
      path: REQUEST_PATH.user.sendOTP(),
      body: {
        email: data.email,
      },
    })
    
    SetResending(false);
    if(res && typeof res !== 'boolean') {
      toast({
        title: 'Send OTP xuccessfully',
        description: 'OTP have been sent to your email',
      });
      changeData('otpExpire', res.result.expired);
      changeData('otp', '');
      SetOtp('');
      SetSecondRemain(Math.floor(res.result.expired - new Date().getTime()/1000));
    }

  }

  const checkCode = async (code: string) => {
    SetCheckingOTP(true);
    if(secondRemain > 0) {
      const res = await post<CheckOTPResult>({
        path: REQUEST_PATH.user.checkOTP(),
        body: {
          code: code,
          mailUser: data.email,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        })
      SetCheckingOTP(false);

      if(res && typeof res !== 'boolean') {
        changeData('otp', code);
        toast({
          title: 'OTP verified',
          description: 'Your OTP is corrected, please update your new password.',
        })
        onSuccess();
      }
    }
    else {
      SetCheckingOTP(false);
      toast({
        title: 'OTP expired',
        description: 'This otp token is expired, please resend a new OTP.',
      })
    }

  }


  useEffect(() => {
    if(secondRemain > 0) {
      const timer = setInterval(() => {
        SetSecondRemain(remain => remain-1);
      }, 1000);
      return () => {
        clearTimeout(timer);  
      }
    }
  }, [secondRemain]);

  return (
    <div className={`${className} flex flex-col gap-3 items-end`}>
      <div className='w-full flex justify-center gap-3'>
        <InputOTPComponent 
          value={otp}
          disabled={checkingOTP} 
          onChange={(value:string) => {
            SetOtp(value)
            if(value.length === 6 && callAPI) {
              checkCode(value)
              SetCallAPI(false);
            }
            else {
              !callAPI && SetCallAPI(true);
            }
          }}
          />
      </div>
      <Button   
        onClick={() => sendOtp()} 
        variant={secondRemain > 0 || resending || checkingOTP ? 'outline' : 'default'} 
        disabled={secondRemain > 0 || resending || checkingOTP}
        className='w-fit'
        >
          {
            checkingOTP ? 
            <> 
              <LoaderCircleIcon className=' w-3 h-3 animate-spin mr-2' />Verifing OTP
            </> : 
            (<> 
              {resending ? <>
                <LoaderCircleIcon className=' w-3 h-3 animate-spin mr-2' />Sending new OTP
              </>
              : 
              <>
                Resend OTP {secondRemain > 0 ? ` in ${secondRemain}s` : ''}
              </>
              }
            </>)
          }
        
      </Button>
    </div>
  )
}