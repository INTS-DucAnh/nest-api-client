import { REQUEST_PATH, REQUEST_URL } from '@/common/constant/api.constant';
import { DateFormat, SeparateSecondary, Time12Format } from '@/common/constant/date.constant';
import { DateModifyRecordEnum, ModifierRecordEnum } from '@/common/enum/table.enum';
import { DateFormatType } from '@/common/type/date.type';
import { PostAdminFindItemType } from '@/common/type/post.type';
import { PostAdminFindResult } from '@/common/type/result.type';
import DialogDeletePost from '@/components/dialog/dialog-post/delete';
import DialogUpdatePost from '@/components/dialog/dialog-post/update';
import FetchingData from '@/components/loading/fetching';
import { Button } from '@/components/ui/button';
import CardComponent, { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { TableContext, TableContextType } from '@/contexts/table.context';
import useDebounce from '@/hooks/useDebounce.hook';
import useRequest from '@/hooks/useRequestApi.hook';
import useTableState, { TableState } from '@/hooks/useTableState.hook';
import { ColumnDef } from '@tanstack/react-table';
import { ImageIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useContext, useEffect } from 'react';
import DateCell from '../date.cell';
import UserCell from '../user.cell';
import MenuActionPost from './action-menu.table';

export interface PostTableState extends TableState {
  data: PostAdminFindItemType[];
  name: string;
  categoryIds: string[];
  tagIds: string[];
}

export type ActionMenuPostItemType = { trigger: React.FC<{ data: PostAdminFindItemType }> };

export default function PostTable() {
  const { reload, SetReloadTable } = useContext<TableContextType>(TableContext);
  const { post } = useRequest();
  const { state, SetTableState } = useTableState<PostTableState>({
    data: [],
    fetching: true,
    page: 1,
    size: 10,
    total: 0,
    name: '',
    categoryIds: [],
    tagIds: [],
  });
  const { SetListen, listen, debounced } = useDebounce<string>({ initValue: state.name, delay: 500 });
  const { toast } = useToast();

  const onSuccess = () => {
    SetReloadTable(true);
  };

  const ActionMenuItems: ActionMenuPostItemType[] = [
    {
      trigger: ({ data }: { data: PostAdminFindItemType }) => {
        return (
          <DialogUpdatePost
            onSuccess={onSuccess}
            post={data}
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
      trigger: ({ data }: { data: PostAdminFindItemType }) => {
        return (
          <DialogDeletePost
            onSuccess={() => {
              if ((state.total - 1) % state.size === 0 && state.page > 1) {
                SetTableState({
                  page: state.page - 1,
                });
              }
              SetReloadTable(true);
            }}
            post={data}
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

  const columns: ColumnDef<PostAdminFindItemType>[] = [
    {
      header: 'No.',
      cell: ({ row }) => {
        return <p>{1 + row.index + state.size * (state.page - 1)}</p>;
      },
    },
    {
      header: 'Thumbnail',
      accessorKey: 'thumbnail',
      cell: ({ row }) => {
        return (
          <div className=' aspect-video h-[50px] w-auto rounded-lg overflow-hidden flex items-center justify-center bg-accent border'>
            {row.original.thumbnail ? (
              <img src={`${REQUEST_URL}/${row.original.thumbnail}`} alt='post' className='w-full h-full object-cover' />
            ) : (
              <ImageIcon className='w-5 h-5 text-muted-foreground' />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => {
        return <p className='w-fit max-w-36 overflow-hidden line-clamp-2 text-ellipsis'>{row.original.title}</p>;
      },
    },
    {
      accessorKey: 'content',
      header: 'Content',
      cell: ({ row }) => {
        return <p className='w-fit max-w-56 overflow-hidden line-clamp-2 text-ellipsis'>{row.original.content}</p>;
      },
    },
    {
      accessorKey: 'user',
      header: 'Created By',
      cell: UserCell<PostAdminFindItemType>({ type: ModifierRecordEnum.USER }),
    },
    {
      accessorKey: 'createAt',
      header: 'Created At',
      cell: DateCell<PostAdminFindItemType>({
        type: DateModifyRecordEnum.CREATE,
        format: `${DateFormat} ${SeparateSecondary} ${Time12Format}` as DateFormatType,
      }),
    },
    {
      accessorKey: 'updateAt',
      header: 'Update At',
      cell: DateCell<PostAdminFindItemType>({
        type: DateModifyRecordEnum.UPDATE,
        format: `${DateFormat} ${SeparateSecondary} ${Time12Format}` as DateFormatType,
      }),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableHiding: false,
      cell: MenuActionPost({
        actionItems: ActionMenuItems,
      }),
    },
  ];

  const getPostList = async () => {
    SetTableState({
      fetching: true,
    });
    const res = await post<PostAdminFindResult>({
      path: REQUEST_PATH.post.findByCategory(),
      body: {
        page: state.page,
        size: state.size,
        query: state.name,
        idsCategory: [],
        idsTag: [],
      },
      headers: {
        'Content-Type': 'application/json',
      },
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

  useEffect(() => {
    reload && getPostList();
  }, [state.page, state.name, reload]);

  useEffect(() => {
    SetTableState({ name: debounced });
    SetReloadTable(true);
  }, [debounced]);

  return (
    <CardComponent title='Post Lists' description='Manage, update user posts.'>
      <CardContent>
        {state.fetching && <FetchingData />}

        <div>
          <div className='flex items-center pb-4 gap-3'>
            <Input
              placeholder='Find by title or content ...'
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
          of <strong>{state.total}</strong> posts
        </div>
      </CardFooter>
    </CardComponent>
  );
}
