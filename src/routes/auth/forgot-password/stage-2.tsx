import { REQUEST_PATH } from '@/common/constant/api.constant';
import { SendOTPResult } from '@/common/type/result.type';
import { Button } from '@/components/ui/button';
import InputOTPComponent from '@/components/ui/input-otp';
import { useToast } from '@/components/ui/use-toast';
import { ForgotPasswordContext, ForgotPasswordContextType } from '@/contexts/forgot-password.context';
import useRequest from '@/hooks/useRequestApi.hook';
import { useContext, useEffect, useState } from 'react';

export default function OTPValidationStage({className, onSuccess}: {className: string, onSuccess: () => void}) {
  const {data, changeData} = useContext<ForgotPasswordContextType>(ForgotPasswordContext);
  const [secondRemain, SetSecondRemain] = useState<number>(Math.floor(Math.abs(data.otpExpire - new Date().getTime()/1000)));
  const { post } = useRequest();
  const {toast} = useToast();
  
  const sendOtp = async () => {
    const res = await post<SendOTPResult>({
      path: REQUEST_PATH.user.sendOTP(),
      body: {
        email: data.email,
      },
    })
    if(res && typeof res !== 'boolean') {
      toast({
        title: 'Send OTP xuccessfully',
        description: 'OTP have been sent to your email',
      });
      changeData('otpExpire', res.result.expired);
      SetSecondRemain(Math.floor(Math.abs(res.result.expired - new Date().getTime())/1000));
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
    <div>
      <div>
      <InputOTPComponent />
      <Button 
        onClick={() => sendOtp()} 
        variant={secondRemain > 0 ? 'outline' : 'default'} 
        disabled={secondRemain > 0}>
      Resend OTP {secondRemain > 0 ? ` in ${secondRemain}s` : ''}
      </Button>
      </div>

    </div>
  )
}