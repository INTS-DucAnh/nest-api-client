import ForgotPasswordRoute from './forgot-password';
import ForgotPasswordProvider from '@/contexts/forgot-password.context';

export default function ForgotPasswordHolder() {

  return(
    <ForgotPasswordProvider>
      <ForgotPasswordRoute />
    </ForgotPasswordProvider>
  )
}