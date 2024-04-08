import { UserContext, UserContextType } from '@/contexts/user.context';
import useNavigator from '@/hooks/useNavigator.hook';
import { useContext } from 'react';
import { BreadcrumbComponent } from '../ui/breadcrumb';
import UserDropdownMenu from '../user-info/user-dropdown';

export default function PrivateHeader() {
  const { user } = useContext<UserContextType>(UserContext);
  const { previous } = useNavigator();

  return (
    <header className='flex items-center justify-between w-full h-fit pt-4'>
      <div>
        <BreadcrumbComponent breads={previous} />
      </div>
      {user && <UserDropdownMenu user={user} />}
    </header>
  );
}
