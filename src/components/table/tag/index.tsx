import { TagFindItemType } from '@/common/type/tag.type';
import DialogDeleteTag from '@/components/dialog-tag/delete';
import DialogUpdateTag from '@/components/dialog-tag/update';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/table';
import { ColumnDef } from '@tanstack/react-table';
import MenuAction from '../action-menu.table';

export const columns: ColumnDef<TagFindItemType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className='rounded-md'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className='rounded-md'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'userCreate',
    header: 'Created By',
  },
  {
    accessorKey: 'createAt',
    header: 'Created At',
  },
  {
    accessorKey: 'userUpdate',
    header: 'Update By',
  },
  {
    accessorKey: 'updateAt',
    header: 'Update At',
  },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: MenuAction,
  },
];

export default function TagTable({tags}: {tags: TagFindItemType[]} ) {
  return (
    <div>
      <DataTable columns={columns} data={tags}/>
    </div>
  )
}