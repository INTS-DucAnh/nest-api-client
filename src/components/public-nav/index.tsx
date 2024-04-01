import { ThemeEnum } from '@/common/enum/theme.enum';
import { UserContext, UserContextType } from '@/contexts/user.context';
import useTheme from '@/hooks/useTheme.hook';
import { PublicNavigationMenu } from '@/routes/public/public.componet';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DialogLogin from '../dialog-login';
import DialogSignup from '../dialog-signup';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export default function PublicNavigation() {
  const { user } = useContext<UserContextType>(UserContext);

  const { theme, changeTheme } = useTheme();
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
          <Button
            variant={'outline'}
            size={'icon'}
            onClick={() => {
              changeTheme(
                theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK,
              );
            }}>
            {theme === ThemeEnum.DARK ? (
              <MoonIcon className="h-4 w-4" />
            ) : (
              <SunIcon className="h-4 w-4" />
            )}
          </Button>
          <DialogSignup />
          <DialogLogin />
        </div>
      )}
    </Card>
  );
}
