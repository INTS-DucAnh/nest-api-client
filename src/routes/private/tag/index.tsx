import DialogCreateTag from '@/components/dialog-tag/create';
import { Button } from '@/components/ui/button';
import TabsComponent, { TabsContent, TabsLists } from '@/components/ui/tabs';
import { TagIcon } from 'lucide-react';
import TagTable from '@/components/table/tag';
import TableProvider, { TableContext, TableContextType } from '@/contexts/table.context';
import { useContext } from 'react';


export default function TagRoute() {

  return (
    <TableProvider>
      <TagPage />
    </TableProvider>
  );
}

function TagPage() {
  const {reload, SetReloadTable} = useContext<TableContextType>(TableContext);
  const tabs: TabsLists[] = [
    {
      title: 'All',
      value: 'list',
    },
  ];

  return (
    <TabsComponent
      tabs={tabs}
      className="w-full justify-start flex flex-col gap-3"
      tabsRight={
        !reload && (<DialogCreateTag
          onSuccess={() => {SetReloadTable(true)}}
          trigger={
            <Button>
              <TagIcon className="h-3 w-3 mr-1" />
              <p className="font-sm">Add Tag</p>
            </Button>
          }
        />)
      }>

      <TabsContent value={tabs[0].value} className='relative'>
        <TagTable />
      </TabsContent>

    </TabsComponent>
  );
}