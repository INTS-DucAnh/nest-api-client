import useAccessToken from '@/hooks/useAccessToken.hook';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRoute() {
  const { accessToken } = useAccessToken();
  if (accessToken) return <Navigate to={'/'} />;
  return (
    <>
      <Outlet />
    </>
  );
}
