import useAccessToken from '@/hooks/useAccessToken.hook';
import { Navigate, Outlet } from 'react-router-dom';
import PrivateHeader from '../private-header';
import PrivateNavigation from '../private-nav';
import { ScrollArea } from '../ui/scroll-area';
import { useContext } from 'react';
import { UserContext, UserContextType } from '@/contexts/user.context';
import { RoleUserEnum } from '@/common/enum/user.enum';

export default function PrivateRoute() {
  const { GetToken } = useAccessToken();
  const { user } = useContext<UserContextType>(UserContext);

  if (!GetToken() || user && user.role === RoleUserEnum.USER) return <Navigate to={'/'} />;

  return (
    <main className="w-full h-full flex">
      <PrivateNavigation />

      <ScrollArea className="flex flex-col flex-1 px-6 py-8">
        <div className="h-fit flex flex-col gap-5">
          <PrivateHeader />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}
