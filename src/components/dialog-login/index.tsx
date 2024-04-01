import DialogComponent from '../dialog';
import LoginForm from '../form/login';
import { Button } from '../ui/button';
export default function DialogLogin() {
  return (
    <DialogComponent
      trigger={<Button>Login</Button>}
      title="Login"
      description="This is where login form in">
      <LoginForm />
    </DialogComponent>
  );
}
