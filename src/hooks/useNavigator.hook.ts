import { PATH_ROOT } from '@/common/constant/nav.constant';
import { NavigationItem } from '@/common/type/nav.type';
import {
  NavigateContext,
  NavigateContextType,
} from '@/contexts/navigate.context';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useNavigator() {
  const { previous, replace, add, reset, remove } =
    useContext<NavigateContextType>(NavigateContext);

  const location = useLocation();

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
  }, [location]);

  return { previous, setRoot, replace, add, reset };
}
