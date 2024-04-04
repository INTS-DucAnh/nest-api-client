import { UserContext, UserContextType } from '@/contexts/user.context';
import { PublicNavigationMenu } from '@/routes/public/public.componet';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DialogLogin from '../dialog-auth/login';
import DialogSignup from '../dialog-auth/signup';
import ThemeSwitcher from '../theme-switcher';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { DropdownGroupComponent, DropdownMenuComponent, DropdownMenuItem } from '../ui/dropdown-menu';
import { LayoutDashboardIcon, LogOutIcon, SettingsIcon, UserRoundIcon } from 'lucide-react';
import AvatarComponet from '../ui/avatar';
import useNavigator from '@/hooks/useNavigator.hook';
import { Separator } from '../ui/separator';
import { RoleUserEnum } from '@/common/enum/user.enum';
import ToolTip from '../ui/tooltip';
import DialogLogout from '../dialog-auth/logout';

export default function PublicNavigation() {
  const { user } = useContext<UserContextType>(UserContext);
  useNavigator();
  const navigate = useNavigate();

  return (
    <Card className="flex flex-row justify-between items-center box-border px-72 py-3 bg-background w-full rounded-none">
      <div className="flex gap-10 items-center flex-1">
        <Button variant="ghost">
          <Link to={'/'} className="font-black text-lg text-primary ">
            NestJS API
          </Link>
        </Button>

        <PublicNavigationMenu />
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        {user ? (
        <>      
          <div>
          <DropdownMenuComponent
            title="My Account"
            trigger={
              <Button
                variant="outline"
                className="w-fit h-fit p-0 rounded-full relative">
                <AvatarComponet
                  className="bg-transparent w-9 h-9"
                  src={user?.avatar || ''}
                  alt="user"
                  fallback={<UserRoundIcon className=" text-muted-foreground h-5 w-5" />}
                />
              </Button>
            }
            groups={
              <>
                <DropdownGroupComponent>
                  <DropdownMenuItem>
                    <div className='flex gap-2 items-center py-1 text-foreground'>
                      <div className='w-fit h-fit bg-muted flex items-center justify-center rounded-full'>
                        <AvatarComponet
                          className="bg-transparent h-8 w-8"
                          src={user?.avatar || ''}
                          alt="user"
                          fallback={<UserRoundIcon className=" text-muted-foreground h-5 w-5" />}
                        />                        
                      </div>
                      <div>
                        <p className='text-xs'>{user.name}</p>
                        <p className='text-xs'>{user.email}</p>
                      </div>

                    </div>
                  </DropdownMenuItem>
                </DropdownGroupComponent>
                
                <DropdownGroupComponent>
                  {
                    user.role !== RoleUserEnum.USER && (
                    <>
                      <Separator />
                      <DropdownMenuItem onClick={() => {navigate('/admin')}}>
                        <LayoutDashboardIcon className="h-4 w-4 mr-2 scale-90" /> Dashboard
                      </DropdownMenuItem>
                    </>
                    )
                  }
                  <Separator />

                  <DropdownMenuItem onClick={() => navigate('/setting')}>
                    <ToolTip 
                    trigger={
                      <>
                        <SettingsIcon className="h-4 w-4 mr-2 scale-90" /> 
                        Setting
                      </>
                    } 
                    dur={200} 
                    side='left' 
                    text='Move to Setting'/>
                    
                  </DropdownMenuItem>


                </DropdownGroupComponent>
                
                <DialogLogout trigger={
                   <Button className='w-full h-fit py-[5px] flex justify-start px-2 text-destructive cursor-default' variant={'ghost'}>
                      <LogOutIcon className="h-4 w-4 mr-2 scale-90" /> Logout
                    </Button>
                  }/>
              </>
            }
          />
          </div>
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
