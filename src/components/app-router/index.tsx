import { LoginForm } from '@/common/form';
import { Route, Routes } from 'react-router-dom';
import FormHolder from '../form';
import PrivateRoute from './private.route';

export default function AppRouter() {
  const onClose = () => {
    console.log('Close');
  };
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<p>Welcome to Private route</p>} />
      </Route>
      <Route></Route>
      <Route
        path="*"
        element={<FormHolder form={LoginForm} onClose={onClose} />}
      />
    </Routes>
  );
}
