import DialogCreatePost from '@/components/dialog/dialog-post/create';
import PostTable from '@/components/table/post';
import { Button } from '@/components/ui/button';
import TabsComponent, { TabsContent, TabsLists } from '@/components/ui/tabs';
import TableProvider, { TableContext, TableContextType } from '@/contexts/table.context';
import { CircleFadingPlusIcon } from 'lucide-react';
import { useContext } from 'react';

export default function PostRoute() {
  return (
    <TableProvider>
      <PostPage />
    </TableProvider>
  );
}

function PostPage() {
  const { reload, SetReloadTable } = useContext<TableContextType>(TableContext);
  const tabs: TabsLists[] = [
    {
      title: 'All',
      value: 'list',
    },
  ];

  return (
    <TabsComponent
      tabs={tabs}
      className='w-full justify-start flex flex-col gap-3'
      tabsRight={
        !reload && (
          <DialogCreatePost
            onSuccess={() => {
              SetReloadTable(true);
            }}
            trigger={
              <Button>
                <CircleFadingPlusIcon className='h-3 w-3 mr-1' />
                <p className='font-sm'>Add Post</p>
              </Button>
            }
          />
        )
      }
    >
      <TabsContent value={tabs[0].value} className='relative'>
        <PostTable />
      </TabsContent>
    </TabsComponent>
  );
}
