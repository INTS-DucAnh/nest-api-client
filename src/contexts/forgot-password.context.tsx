import { createContext, ReactNode, useState } from 'react'

export type ForgotData = {
  otp: string,
  email: string,
  password: string,
  cfPassword: string,
  otpExpire: number,
}

export type ForgotField = 'otp' | 'email' | 'password' | 'cfPassword' | 'otpExpire';

export type ForgotPasswordContextType = {
  data: ForgotData,
  changeData: (key: ForgotField, value: string | number) => void,
}

export const ForgotPasswordContext = createContext<ForgotPasswordContextType>({
  data: {
    otp: '',
    email: '',
    password: '',
    cfPassword: '',
    otpExpire: 0,
  },
  changeData: (key: ForgotField, value: string | number )=> null,
})

export default function ForgotPasswordProvider({children}: {children: ReactNode}) {
  const [data, SetData] = useState<ForgotData>({
    otp: '',
    email: '',
    password: '',
    cfPassword: '',
    otpExpire: 0,
  });

  const changeData = (key: ForgotField, value: string | number) => {
    SetData(data => ({
      ...data,
      [key]: value,
    }))
  }

  const providerValue : ForgotPasswordContextType = {
    data, changeData,
  }

  return (
    <ForgotPasswordContext.Provider value={providerValue} >
      {children}
    </ForgotPasswordContext.Provider>
  )
}