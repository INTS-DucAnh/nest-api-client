import { Outlet } from 'react-router-dom';
import PublicNavigation from '../public-nav';
import { ScrollArea } from '../ui/scroll-area';

export default function PublicRoute() {
  return (
    <main className='w-full h-full relative flex flex-col'>
      <PublicNavigation />
      <ScrollArea className='flex-1 box-border'>
        <Outlet />
      </ScrollArea>
    </main>
  );
}
