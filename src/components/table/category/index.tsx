import { REQUEST_PATH } from '@/common/constant/api.constant';
import { DateFormat, SeparateSecondary, Time12Format } from '@/common/constant/date.constant';
import { DateModifyRecordEnum, ModifierRecordEnum } from '@/common/enum/table.enum';
import { DateFormatType } from '@/common/type/date.type';
import { FindTagResult } from '@/common/type/result.type';
import { TagFindItemType } from '@/common/type/tag.type';
import DialogUpdatecategory from '@/components/dialog/dialog-category/update';
import DialogDeleteTag from '@/components/dialog/dialog-tag/delete';
import FetchingData from '@/components/loading/fetching';
import { Button } from '@/components/ui/button';
import CardComponent, { CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/table';
import { TableContext, TableContextType } from '@/contexts/table.context';
import useDebounce from '@/hooks/useDebounce.hook';
import useRequest from '@/hooks/useRequestApi.hook';
import useTableState, { TableState } from '@/hooks/useTableState.hook';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useContext, useEffect } from 'react';
import MenuActionTag from '../action-menu.table';
import DateCell from '../date.cell';
import UserCell from '../user.cell';

export interface TagTableState extends TableState {
  data: TagFindItemType[];
  name: string;
}

export type ActionMenuTagItemType = { trigger: React.FC<{ data: TagFindItemType }> };

export default function CategoryTable() {
  const { reload, SetReloadTable } = useContext<TableContextType>(TableContext);
  const { get } = useRequest();
  const { state, SetTableState } = useTableState<TagTableState>({
    data: [],
    fetching: true,
    page: 1,
    size: 10,
    total: 0,
    name: '',
  });
  const { SetListen, listen, debounced } = useDebounce<string>({ initValue: state.name, delay: 500 });

  const onSuccess = () => {
    SetReloadTable(true);
  };

  const ActionMenuItems: ActionMenuTagItemType[] = [
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
          <DialogDeleteTag
            onSuccess={() => {
              if ((state.total - 1) % state.size === 0 && state.page > 1) {
                SetTableState({
                  page: state.page - 1,
                });
              }
              SetReloadTable(true);
            }}
            tag={data}
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

  const columns: ColumnDef<TagFindItemType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='rounded-md'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
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
      SetReloadTable(false);
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
          <div className='flex items-center pb-4'>
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
          of <strong>{state.total}</strong> tags
        </div>
      </CardFooter>
    </CardComponent>
  );
}
