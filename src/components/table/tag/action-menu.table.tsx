import { TagFindItemType } from '@/common/type/tag.type';
import { CellContext } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { ActionMenuTagItemType } from '.';
import { Button } from '../../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../ui/dropdown-menu';

export default function MenuActionTag({ actionItems }: { actionItems: ActionMenuTagItemType[] }) {
  return function Component({ row }: CellContext<TagFindItemType, unknown>) {
    const data = row.original;

    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className='flex flex-col gap-1'>
              {actionItems.map((item, i) => {
                const Item = item.trigger;
                return <Item key={i} data={data} />;
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };
}
