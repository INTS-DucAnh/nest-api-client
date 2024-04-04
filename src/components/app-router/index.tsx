import DashboardRoute from '@/routes/private/_';
import TagRoute from '@/routes/private/tag';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './auth.route';
import PrivateRoute from './private.route';
import PublicRoute from './public.route';
import NavigateProvider from '@/contexts/navigate.context';
import LoginRoute from '@/routes/auth/login/login';
import SignupRoute from '@/routes/auth/signup/signup';
import ForgotPasswordHolder from '@/routes/auth/forgot-password';

export default function AppRouter() {
  return (
    <NavigateProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="admin">
            <Route path="" element={<DashboardRoute />} />
            <Route path="posts" element={<p>This is Post Page</p>} />
            <Route path="tags" element={<TagRoute />} />
            <Route path="categories" element={<p>This is Category Page</p>} />

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
          <Route path="login" element={<LoginRoute />} />
          <Route path="signup" element={<SignupRoute />} />
          <Route path="forgot-password" element={<ForgotPasswordHolder/>} />
        </Route>
      </Routes>      
    </NavigateProvider>

  );
}
