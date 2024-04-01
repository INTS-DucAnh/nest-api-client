import useAccessToken from '@/hooks/useAccessToken.hook';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { accessToken } = useAccessToken();
  if (!accessToken) return <Navigate to={'/'} />;

  return (
    <main>
      <section>
        <p>Nav</p>
      </section>

      <section>
        <Outlet />
      </section>
    </main>
  );
}
