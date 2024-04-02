import { UserContext, UserContextType } from '@/contexts/user.context';
import { PublicNavigationMenu } from '@/routes/public/public.componet';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DialogLogin from '../dialog-login';
import DialogSignup from '../dialog-signup';
import ThemeSwitcher from '../theme-switcher';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export default function PublicNavigation() {
  const { user } = useContext<UserContextType>(UserContext);

  return (
    <Card className="flex flex-row justify-between items-center box-border px-64 py-3 bg-background w-full rounded-none">
      <div className="flex gap-16 items-center flex-1">
        <Button variant="ghost">
          <Link to={'/'} className="font-black text-lg text-primary ">
            NestJS API
          </Link>
        </Button>

        <PublicNavigationMenu />
      </div>

      {user ? (
        <div>{user.avatar}</div>
      ) : (
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <DialogSignup />
          <DialogLogin />
        </div>
      )}
    </Card>
  );
}
