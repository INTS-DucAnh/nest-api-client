import { RoleUserEnum } from '@/common/enum/user.enum';
import { UserLoginInfo } from '@/common/type/user.type';
import { LayoutDashboardIcon, LogOutIcon, SettingsIcon, UserRoundIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DialogLogout from '../dialog/dialog-auth/logout';
import AvatarComponet from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownGroupComponent, DropdownMenuComponent, DropdownMenuItem } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import ToolTip from '../ui/tooltip';
import UserInfo from './user-info';

export default function UserDropdownMenu({ user }: { user: UserLoginInfo }) {
  const navigate = useNavigate();

  return (
    <div>
      <DropdownMenuComponent
        title='My Account'
        trigger={
          <Button variant='outline' className='w-fit h-fit p-0 rounded-full relative'>
            <AvatarComponet
              className='bg-transparent w-9 h-9'
              src={user?.avatar || ''}
              alt='user'
              fallback={<UserRoundIcon className=' text-muted-foreground h-5 w-5' />}
            />
          </Button>
        }
        groups={
          <>
            <DropdownGroupComponent>
              <DropdownMenuItem>
                <UserInfo user={user}>{user && <p className='text-xs'>{user.email}</p>}</UserInfo>
              </DropdownMenuItem>
            </DropdownGroupComponent>

            <DropdownGroupComponent>
              {user.role !== RoleUserEnum.USER && (
                <>
                  <Separator />
                  <DropdownMenuItem
                    onClick={() => {
                      navigate('/admin');
                    }}
                  >
                    <LayoutDashboardIcon className='h-4 w-4 mr-2 scale-90' /> Dashboard
                  </DropdownMenuItem>
                </>
              )}
              <Separator />

              <DropdownMenuItem onClick={() => navigate('/setting')}>
                <ToolTip
                  trigger={
                    <>
                      <SettingsIcon className='h-4 w-4 mr-2 scale-90' />
                      Setting
                    </>
                  }
                  dur={200}
                  side='left'
                  text='Move to Setting'
                />
              </DropdownMenuItem>
            </DropdownGroupComponent>

            <DialogLogout
              trigger={
                <Button className='w-full h-fit py-[5px] flex justify-start px-2 text-destructive cursor-default' variant={'ghost'}>
                  <LogOutIcon className='h-4 w-4 mr-2 scale-90' /> Logout
                </Button>
              }
            />
          </>
        }
      />
    </div>
  );
}
