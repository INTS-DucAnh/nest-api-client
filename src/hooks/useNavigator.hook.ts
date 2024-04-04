import { PATH_ROOT } from '@/common/constant/nav.constant';
import { NavigationItem } from '@/common/type/nav.type';
import {
  NavigateContext,
  NavigateContextType,
} from '@/contexts/navigate.context';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAccessToken from './useAccessToken.hook';
import { UserContext, UserContextType } from '@/contexts/user.context';

export default function useNavigator() {
  const { previous, replace, add, reset, remove } =
    useContext<NavigateContextType>(NavigateContext);
  const location = useLocation();
  const {GetToken} = useAccessToken();
  const {set} = useContext<UserContextType>(UserContext);

  const setRoot = (bread: NavigationItem) => {
    replace(0, bread);
  };

  const pathname = (pathname: string) => {
    const [root, ...path] = pathname.replace('/', '').split('/');
    setRoot(PATH_ROOT.admin);
    // TODO: push item to breadcrumb
  };

  useEffect(() => {
    pathname(location.pathname);
    const token = GetToken();
    token && set(token)

  }, [location]);

  return { previous, setRoot, replace, add, reset };
}
