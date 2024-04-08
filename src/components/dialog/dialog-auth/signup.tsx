import DialogComponent from '..';
import SignupForm from '../../form/signup';
import { Button } from '../../ui/button';

export default function DialogSignup() {
  return (
    <DialogComponent
      trigger={<Button variant='secondary'>Signup</Button>}
      title='Create an account'
      description='Enter your email below to create your account.'
    >
      <SignupForm />
    </DialogComponent>
  );
}
