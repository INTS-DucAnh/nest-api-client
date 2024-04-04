import useAccessToken from '@/hooks/useAccessToken.hook';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRoute() {
  const { GetToken } = useAccessToken();
  if (GetToken()) return <Navigate to={'/'} />;
  return (
    <>
      <Outlet />
    </>
  );
}
