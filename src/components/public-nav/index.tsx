import { UserContext, UserContextType } from '@/contexts/user.context';
import useNavigator from '@/hooks/useNavigator.hook';
import { PublicNavigationMenu } from '@/routes/public/public.componet';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DialogLogin from '../dialog/dialog-auth/login';
import DialogSignup from '../dialog/dialog-auth/signup';
import ThemeSwitcher from '../theme-switcher';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import UserDropdownMenu from '../user-info/user-dropdown';

export default function PublicNavigation() {
  const { user } = useContext<UserContextType>(UserContext);
  useNavigator();

  return (
    <Card className='flex flex-row justify-between items-center box-border px-72 py-3 bg-background w-full rounded-none'>
      <div className='flex gap-10 items-center flex-1'>
        <Button variant='ghost'>
          <Link to={'/'} className='font-black text-lg text-primary '>
            NestJS API
          </Link>
        </Button>

        <PublicNavigationMenu />
      </div>
      <div className='flex items-center gap-2'>
        <ThemeSwitcher />
        {user ? (
          <>
            <UserDropdownMenu user={user} />
          </>
        ) : (
          <>
            <DialogSignup />
            <DialogLogin />
          </>
        )}
      </div>
    </Card>
  );
}
