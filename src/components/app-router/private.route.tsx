import useAccessToken from '@/hooks/useAccessToken.hook';
import { Navigate, Outlet } from 'react-router-dom';
import PrivateHeader from '../private-header';
import PrivateNavigation from '../private-nav';
import { ScrollArea } from '../ui/scroll-area';

export default function PrivateRoute() {
  const { accessToken } = useAccessToken();
  if (accessToken) return <Navigate to={'/'} />;

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
