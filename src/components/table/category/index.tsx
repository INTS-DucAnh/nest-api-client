import { REQUEST_PATH } from '@/common/constant/api.constant';
import { DateFormat, SeparateSecondary, Time12Format } from '@/common/constant/date.constant';
import { DateModifyRecordEnum, ModifierRecordEnum } from '@/common/enum/table.enum';
import { CategoryFindItemType } from '@/common/type/category.type';
import { DateFormatType } from '@/common/type/date.type';
import { FindTagResult } from '@/common/type/result.type';
import { TagFindItemType } from '@/common/type/tag.type';
import DialogDeleteCategory from '@/components/dialog/dialog-category/delete';
import DialogUpdatecategory from '@/components/dialog/dialog-category/update';
import FetchingData from '@/components/loading/fetching';
import { Button } from '@/components/ui/button';
import CardComponent, { CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { TableContext, TableContextType } from '@/contexts/table.context';
import useDebounce from '@/hooks/useDebounce.hook';
import useRequest from '@/hooks/useRequestApi.hook';
import useTableState, { TableState } from '@/hooks/useTableState.hook';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import DateCell from '../date.cell';
import MenuActionTag from '../tag/action-menu.table';
import UserCell from '../user.cell';

export interface CategoryTableState extends TableState {
  data: CategoryFindItemType[];
  name: string;
}

export type ActionMenuCategoryItemType = { trigger: React.FC<{ data: CategoryFindItemType }> };

export default function CategoryTable() {
  const { reload, SetReloadTable } = useContext<TableContextType>(TableContext);
  const { get, post } = useRequest();
  const { state, SetTableState } = useTableState<CategoryTableState>({
    data: [],
    fetching: true,
    page: 1,
    size: 10,
    total: 0,
    name: '',
  });
  const { SetListen, listen, debounced } = useDebounce<string>({ initValue: state.name, delay: 500 });
  const { toast } = useToast();
  const [deleteMany, SetDeleteMany] = useState<string[]>([]);

  const onSuccess = () => {
    SetReloadTable(true);
  };

  const ActionMenuItems: ActionMenuCategoryItemType[] = [
    {
      trigger: ({ data }: { data: TagFindItemType }) => {
        return (
          <DialogUpdatecategory
            onSuccess={onSuccess}
            category={data}
            trigger={
              <Button className='w-full h-fit justify-start p-[5px]' variant='ghost'>
                <PencilIcon className='w-3 h-3 mr-2' /> Edit
              </Button>
            }
          />
        );
      },
    },
    {
      trigger: ({ data }: { data: TagFindItemType }) => {
        return (
          <DialogDeleteCategory
            onSuccess={() => {
              if ((state.total - 1) % state.size === 0 && state.page > 1) {
                SetTableState({
                  page: state.page - 1,
                });
              }
              SetReloadTable(true);
            }}
            category={data}
            trigger={
              <Button className='w-full h-fit justify-start p-[5px]' variant={'destructive'}>
                <TrashIcon className='w-3 h-3 mr-2' /> Delete
              </Button>
            }
          />
        );
      },
    },
  ];

  const columns: ColumnDef<CategoryFindItemType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={deleteMany.length === state.data.length}
          onCheckedChange={value => {
            SetDeleteMany(value ? state.data.map(data => data.id) : []);
          }}
          aria-label='Select all'
          className='rounded-md'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={deleteMany.includes(row.original.id)}
          onCheckedChange={value => {
            const rowData: TagFindItemType = row.original;
            SetDeleteMany(prev => (value ? [...prev, rowData.id] : prev.filter(pr => pr !== rowData.id)));
          }}
          aria-label='Select row'
          className='rounded-md'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: 'No.',
      cell: ({ row }) => {
        return <p>{1 + row.index + state.size * (state.page - 1)}</p>;
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'userCreate',
      header: 'Created By',
      cell: UserCell<TagFindItemType>({ type: ModifierRecordEnum.CREATE }),
    },
    {
      accessorKey: 'createAt',
      header: 'Created At',
      cell: DateCell<TagFindItemType>({
        type: DateModifyRecordEnum.CREATE,
        format: `${DateFormat} ${SeparateSecondary} ${Time12Format}` as DateFormatType,
      }),
    },
    {
      accessorKey: 'userUpdate',
      header: 'Update By',
      cell: UserCell<TagFindItemType>({ type: ModifierRecordEnum.UPDATE }),
    },
    {
      accessorKey: 'updateAt',
      header: 'Update At',
      cell: DateCell<TagFindItemType>({
        type: DateModifyRecordEnum.UPDATE,
        format: `${DateFormat} ${SeparateSecondary} ${Time12Format}` as DateFormatType,
      }),
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

  const getCategoryList = async () => {
    SetTableState({
      fetching: true,
    });
    const res = await get<FindTagResult>({
      path: REQUEST_PATH.category.find(),
      query: [
        { key: 'page', value: state.page },
        { key: 'size', value: state.size },
        { key: 'name', value: state.name },
      ],
      token: true,
    });

    if (res) {
      SetTableState({
        data: res.result.data || [],
        total: res.result.total,
        fetching: false,
      });
    }
    SetReloadTable(false);
  };

  const deleteMutiple = async () => {
    const res = await post({
      path: REQUEST_PATH.category.deleteMutiple(),
      token: true,
      body: {
        categoryIds: deleteMany,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res) {
      toast({
        title: 'Deleted Categories',
        description: `Deleted ${deleteMany.length} record on Category table`,
      });
      SetDeleteMany([]);
      getCategoryList();
    }
  };

  useEffect(() => {
    reload && getCategoryList();
  }, [state.page, state.name, reload]);

  useEffect(() => {
    SetTableState({ name: debounced });
    SetReloadTable(true);
  }, [debounced]);

  return (
    <CardComponent title='Category Lists' description='Manage and view your category.'>
      <CardContent>
        {state.fetching && <FetchingData />}

        <div>
          <div className='flex items-center pb-4 gap-3'>
            {deleteMany.length ? (
              <Button variant={'destructive'} onClick={() => deleteMutiple()}>
                <TrashIcon className='w-3 h-3 mr-2' /> Delete {deleteMany.length} record
              </Button>
            ) : (
              <></>
            )}
            <Input
              placeholder='Find by tag name...'
              value={listen}
              onChange={event => {
                SetListen(event.target.value);
              }}
              className='max-w-sm'
            />
          </div>
          <div>
            <DataTable columns={columns} data={state.data} />
            <div className='flex items-center space-x-2 pt-4 justify-center'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  SetReloadTable(true);
                  SetTableState({
                    page: state.page - 1,
                  });
                }}
                disabled={state.page === 1}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  SetReloadTable(true);
                  SetTableState({
                    page: state.page + 1,
                  });
                }}
                disabled={state.page >= Math.ceil(state.total / state.size)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className='text-xs text-muted-foreground'>
          Showing{' '}
          <strong>
            {(state.page - 1) * state.size + 1}-{state.page * state.size}
          </strong>{' '}
          of <strong>{state.total}</strong> categories
        </div>
      </CardFooter>
    </CardComponent>
  );
}
