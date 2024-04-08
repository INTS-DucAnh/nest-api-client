import { RoleUserEnum } from '@/common/enum/user.enum';
import { UserContext, UserContextType } from '@/contexts/user.context';
import useAccessToken from '@/hooks/useAccessToken.hook';
import useNavigator from '@/hooks/useNavigator.hook';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PrivateHeader from '../private-header';
import PrivateNavigation from '../private-nav';
import { ScrollArea } from '../ui/scroll-area';

export default function PrivateRoute() {
  const { GetToken } = useAccessToken();
  const { user } = useContext<UserContextType>(UserContext);
  const { previous } = useNavigator();

  if (!GetToken() || (user && user.role === RoleUserEnum.USER)) return <Navigate to={'/'} />;

  return (
    <main className='w-full h-full flex'>
      <PrivateNavigation />

      <ScrollArea className='flex flex-col px-8 scroll-smooth flex-1'>
        <div className='h-fit flex flex-col max-h-screen gap-5'>
          <PrivateHeader />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}
