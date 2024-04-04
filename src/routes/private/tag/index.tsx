import { TagType } from '@/common/type/tag.type';
import DialogCreateTag from '@/components/dialog-tag/create';
import DialogUpdateTag from '@/components/dialog-tag/update';
import { Button } from '@/components/ui/button';
import CardComponent, { CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/table';
import TabsComponent, { TabsContent, TabsLists } from '@/components/ui/tabs';
import { ColumnDef } from '@tanstack/react-table';
import { TagIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import DialogDeleteTag from '../../../components/dialog-tag/delete';
import useRequest from '@/hooks/useRequestApi.hook';
import { REQUEST_HOST, REQUEST_PATH } from '@/common/constant/api.constant';

export const columns: ColumnDef<TagType>[] = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
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
    cell: ({ row }) => {
      const tag = row.original;
      return (
        <div>
          <DialogUpdateTag
            trigger={<Button variant="outline">Edit</Button>}
            tag={tag}
          />
          <DialogDeleteTag
            tag={tag}
            trigger={
              <Button variant="destructive" className="ml-2">
                Delete
              </Button>
            }
          />
        </div>
      );
    },
  },
];

export default function TagRoute() {
  const [data, SetData] = useState<TagType[]>([
    { name: 'abc' },
    { name: 'bcd' },
  ]);
  const { get } = useRequest();
  const [page, SetPage] = useState(1);
  const [size, SetSize] = useState(10);
  const [total, SetTotal] = useState();
  const [key, SetKey] = useState('');

  const tabs: TabsLists[] = [
    {
      title: 'All',
      value: 'list',
    },
  ];

  const getTagList = async () => {
    await get({
      path: `${REQUEST_HOST}/${REQUEST_PATH.tag}/`,
      // query: [{}]
    });
  };

  useEffect(() => {
    getTagList();
  }, [page]);

  return (
    <TabsComponent
      tabs={tabs}
      className="w-full justify-start flex flex-col gap-3"
      tabsRight={
        <DialogCreateTag
          trigger={
            <Button>
              <TagIcon className="h-3 w-3 mr-1" />
              <p className="font-sm">Add Tag</p>
            </Button>
          }
        />
      }>
      <TabsContent value={tabs[0].value}>
        <CardComponent
          title="Tag Lists"
          description="Manage your tag and view your tag.">
          <CardContent>
            {data ? (
              <DataTable columns={columns} data={data} />
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-32">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    You have no tags
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You can start attach and manage your posts with tags.
                  </p>
                  <div className="mt-5">
                    <DialogCreateTag
                      trigger={
                        <Button>
                          <p className="font-sm">Add Tag</p>
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing{' '}
              <strong>
                {(page - 1) * size + 1}-{page * size}
              </strong>{' '}
              of <strong>{0}</strong> products
            </div>
          </CardFooter>
        </CardComponent>
      </TabsContent>
    </TabsComponent>
  );
}
