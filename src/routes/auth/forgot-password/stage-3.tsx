import { REQUEST_PATH } from '@/common/constant/api.constant';
import { CheckStrongPassword } from '@/common/schema/base.schema';
import { ResetPasswordResult } from '@/common/type/result.type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ForgotPasswordContext, ForgotPasswordContextType } from '@/contexts/forgot-password.context'
import useRequest from '@/hooks/useRequestApi.hook';
import PasswordStrengthChecker from '@/lib/strong-pass-checker';
import { LoaderCircleIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react'

export default function ResetPasswordStage({className, onSuccess}: {className: string, onSuccess: () => void}) {
  const {data, changeData} = useContext<ForgotPasswordContextType>(ForgotPasswordContext);
  const { post } = useRequest();
  const {toast} = useToast();
  const [password, SetPassword] = useState<string>('');
  const [confirm, SetConfirm] = useState<string>('');
  const [loading, SetLoading] = useState<boolean>(false);
  const [valid, SetValid] = useState<boolean>(false);
  const [select, SetSelect] = useState<number>(0);
 
  const resetPassword = async () => {
    SetLoading(true);
    const res = await post<ResetPasswordResult>({
      path: REQUEST_PATH.user.resetPass(),
      body: {
        password,
        mailUser: data.email,
        code: data.otp,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    SetLoading(false);

    if(res && typeof res !== 'boolean') {
      
      toast({
        title: 'Reset password successfully',
        description: 'Reseted your account password, please login to comment and like posts.',
      });

      setTimeout(() => {onSuccess()}, 1000);
    }
  }

  const isValidReset = (password: string, confirm: string) => {
    const valid = !!password && !!confirm && password === confirm && !CheckStrongPassword(password) && !CheckStrongPassword(confirm);
    if(valid ){ 
      changeData('password', password);
    }
    SetValid(valid)
  }

  useEffect(() => {
    isValidReset(password, confirm);
  }, [password, confirm]);

  return (
  <div className={`${className}`}>
    <div className='w-full'>
      <div className='w-full relative'>
        <Label htmlFor='newPass'>New password</Label>
        <Input
          id='newPass'
          placeholder='New Password' 
          onChange={(e) => {
            SetPassword(e.target.value)
          }} 
          onFocus={() => {
            select !== 1 && SetSelect(1);
          }}
          onBlur={() => {
            SetSelect(0)
          }}
          value={password} 
          autoComplete='off'
          className='mt-2'
          />    
          <PasswordStrengthChecker password={password} show={select === 1}/>
      </div>
      <div className='w-full mt-5  relative'>
        <Label htmlFor='cfPass'>Confirm password</Label>
        <Input 
          id='cfPass'
          placeholder='Confirm Password' 
          onChange={(e) => {
            SetConfirm(e.target.value)
          }} 
          onFocus={() => {
            select !== 2 && SetSelect(2);
          }}
          onBlur={() => {
            SetSelect(0)
          }}
          value={confirm} 
          autoComplete='off'
          className='mt-2'
          />    
          <PasswordStrengthChecker password={confirm} show={select === 2}/>  
      </div>      
    </div>
    
    <div className='w-full mt-5 flex gap-3 items-center'>
      <Button
        onClick={resetPassword} 
        disabled={ loading || !valid } 
        variant={loading ? 'outline' : 'default'}
        className='w-full'
      >
        {
          loading ? (<><LoaderCircleIcon className='w-3 h-3 animate-spin mr-2'/> Resetting password</>):
          (<p>Confirm</p>)
        }
      </Button>
    </div>

  </div>)
}