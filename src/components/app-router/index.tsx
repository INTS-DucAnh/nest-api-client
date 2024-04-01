import { Route, Routes } from 'react-router-dom';
import AuthRoute from './auth.route';
import PrivateRoute from './private.route';
import PublicRoute from './public.route';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="admin">
          <Route path="" element={<p>This is Admin Page</p>} />

          <Route path="*" element={<p>Page not found</p>} />
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="" element={<p>Public Dashboard</p>} />
        <Route path="posts">
          <Route path="" element={<p>Post list</p>} />
          <Route path=":id" element={<p>Post Detail</p>} />
        </Route>

        <Route path="*" element={<p>Page not found</p>} />
      </Route>
      <Route element={<AuthRoute />}>
        <Route path="login" element={<p>This is Login</p>} />
        <Route path="signup" element={<p>This is Signup</p>} />
      </Route>
    </Routes>
  );
}
