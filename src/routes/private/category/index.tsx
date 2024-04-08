import DialogCreateCategory from '@/components/dialog/dialog-category/create';
import CategoryTable from '@/components/table/category';
import { Button } from '@/components/ui/button';
import TabsComponent, { TabsContent, TabsLists } from '@/components/ui/tabs';
import TableProvider, { TableContext, TableContextType } from '@/contexts/table.context';
import { Grid2X2Icon } from 'lucide-react';
import { useContext } from 'react';

export default function CategoryRoute() {
  return (
    <TableProvider>
      <CategoryPage />
    </TableProvider>
  );
}

function CategoryPage() {
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
          <DialogCreateCategory
            onSuccess={() => {
              SetReloadTable(true);
            }}
            trigger={
              <Button>
                <Grid2X2Icon className='h-3 w-3 mr-1' />
                <p className='font-sm'>Add Category</p>
              </Button>
            }
          />
        )
      }
    >
      <TabsContent value={tabs[0].value} className='relative'>
        <CategoryTable />
      </TabsContent>
    </TabsComponent>
  );
}
