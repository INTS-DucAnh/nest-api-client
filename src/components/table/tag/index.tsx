import { TagFindItemType } from '@/common/type/tag.type';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/table';
import { ColumnDef } from '@tanstack/react-table';
import CardComponent, { CardContent, CardFooter } from '@/components/ui/card';
import useRequest from '@/hooks/useRequestApi.hook';
import useTableState, { TableState } from '@/hooks/useTableState.hook';
import { useContext, useEffect } from 'react';
import FetchingData from '@/components/loading/fetching';
import DialogCreateTag from '@/components/dialog-tag/create';
import { REQUEST_PATH } from '@/common/constant/api.constant';
import { FindTagResult } from '@/common/type/result.type';
import EmptyTable from '../empty.table';
import { TableContext, TableContextType } from '@/contexts/table.context';
import DialogUpdateTag from '@/components/dialog-tag/update';
import { PencilIcon, TrashIcon } from 'lucide-react';
import MenuActionTag from '../action-menu.table';
import DialogDeleteTag from '@/components/dialog-tag/delete';

export interface TagTableState extends TableState {
  data: TagFindItemType[],
  name: string,
}

export type ActionMenuTagItemType = {trigger: React.FC<{data: TagFindItemType}>}

export default function TagTable() {
  const { reload, SetReloadTable } = useContext<TableContextType>(TableContext);
  const { get } = useRequest();
  const { state , SetTableState } = useTableState<TagTableState>({
    data: [],
    fetching: true, 
    page: 1,
    size: 10,
    total: 0,
    name: '',
  });

  const onSuccess = () =>{
    SetReloadTable(true);
  }

  const ActionMenuItems: ActionMenuTagItemType[] = [
    {
      trigger: ({data}: {data: TagFindItemType}) => {
        return <DialogUpdateTag 
          onSuccess={onSuccess}
          tag={data} 
          trigger={
          <Button className='w-full h-fit justify-start p-[5px]' variant='ghost'>
            <PencilIcon className='w-3 h-3 mr-2'/> Edit
          </Button>
      }/>
      },
    },
    {
      trigger: ({data}: {data: TagFindItemType}) => {
        return <DialogDeleteTag 
          onSuccess={() => {
            if((state.total - 1)% state.size === 0 && state.page > 1) {
              SetTableState({
                page: state.page - 1,
              })
            } 
            SetReloadTable(true);
          }} 
          tag={data} 
          trigger={
          <Button className='w-full h-fit justify-start p-[5px]' variant={'destructive'}>
            <TrashIcon className='w-3 h-3 mr-2'/> Delete
          </Button>
      }/>
      },
    },
  ]

  const columns: ColumnDef<TagFindItemType>[] = [
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
      cell: MenuActionTag({
        actionItems: ActionMenuItems,
      }),
    },
  ];

  const getTagList = async () => {
    SetTableState({
      fetching: true,
    })
    const res = await get<FindTagResult>({
      path: REQUEST_PATH.tag.find(),
      query: [
        {key: 'page', value: state.page},
        {key: 'size', value: state.size},
        {key: 'name', value: state.name},
      ],
      token: true,
    });

    if(res) {
      SetTableState({
        data: res.result.data,
        total: res.result.total,
        fetching: false,
      });
      SetReloadTable(false);
    }
  };

  useEffect(() => {
    reload && getTagList();
  }, [state.page, reload]);

  return (
    <CardComponent
    title="Tag Lists"
    description="Manage your tag and view your tag.">
      
      <CardContent>
        {
          state.fetching && <FetchingData />
        }
        { state.data.length ? (
          <div>
          <DataTable columns={columns} data={state.data}/>
          <div className="flex items-center space-x-2 pt-4 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                SetReloadTable(true);
                SetTableState({
                  page: state.page - 1,
                })
              }}
              disabled={state.page === 1}>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                SetReloadTable(true);
                SetTableState({
                  page: state.page + 1,
                })
              }}
              disabled={state.page >= Math.ceil(state.total/state.size) }>
              Next
            </Button>
          </div>
          </div>
        ) : (
          <EmptyTable 
            mainText='You have no tags' 
            subtitle='You can start attach and manage your posts with tags.'
            addRecord={
              <DialogCreateTag
              onSuccess={onSuccess}
              trigger={
                <Button>
                  <p className="font-sm">Add Tag</p>
                </Button>
              }/>}
          />
        )}
      </CardContent>
      
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing{' '}
          <strong>
            {(state.page - 1) * state.size + 1}-{state.page * state.size}
          </strong>{' '}
          of <strong>{state.total}</strong> tags
        </div>
      </CardFooter>
    
    </CardComponent>
  )
}