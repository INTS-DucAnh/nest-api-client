import { UserContext, UserContextType } from '@/contexts/user.context';
import useNavigator from '@/hooks/useNavigator.hook';
import useTheme from '@/hooks/useTheme.hook';
import { LogOutIcon, SettingsIcon, UserRoundIcon } from 'lucide-react';
import { useContext } from 'react';
import AvatarComponet from '../ui/avatar';
import { BreadcrumbComponent } from '../ui/breadcrumb';
import { Button } from '../ui/button';
import {
  DropdownGroupComponent,
  DropdownMenuComponent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

export default function PrivateHeader() {
  const { user } = useContext<UserContextType>(UserContext);
  const { previous } = useNavigator();
  const { theme } = useTheme();

  return (
    <header className="flex items-center justify-between w-full h-fit ${theme}">
      <div>
        <BreadcrumbComponent breads={previous} />
      </div>
      <div>
        <DropdownMenuComponent
          className={`mr-6 ${theme}`}
          title="My Account"
          trigger={
            <Button
              variant="outline"
              className="w-fit h-fit p-0 rounded-full relative">
              <AvatarComponet
                className="bg-transparent"
                src={user?.avatar || ''}
                alt="user"
                fallback={<UserRoundIcon className="text-foreground h-5 w-5" />}
              />
            </Button>
          }
          groups={
            <>
              <DropdownGroupComponent>
                <DropdownMenuItem>
                  <SettingsIcon className="h-4 w-4 mr-2 scale-90" /> Setting
                </DropdownMenuItem>
              </DropdownGroupComponent>
              <Separator />
              <DropdownGroupComponent>
                <DropdownMenuItem>
                  <LogOutIcon className="h-4 w-4 mr-2 scale-90" /> Logout
                </DropdownMenuItem>
              </DropdownGroupComponent>
            </>
          }
        />
      </div>
    </header>
  );
}
