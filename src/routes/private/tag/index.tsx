import { TagFindItemType } from '@/common/type/tag.type';
import DialogCreateTag from '@/components/dialog-tag/create';
import { Button } from '@/components/ui/button';
import CardComponent, { CardContent, CardFooter } from '@/components/ui/card';
import TabsComponent, { TabsContent, TabsLists } from '@/components/ui/tabs';
import { TagIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import useRequest from '@/hooks/useRequestApi.hook';
import { REQUEST_PATH } from '@/common/constant/api.constant';
import { FindTagResult } from '@/common/type/result.type';
import useTableState, {TableState} from '@/hooks/useTableState.hook';
import TagTable from '@/components/table/tag';
import FetchingData from '@/components/loading/fetching';

export interface TagTableState extends TableState {
  data: TagFindItemType[],
  name: string,
}

export default function TagRoute() {
  const { get } = useRequest();
  const { state , SetTableState} = useTableState<TagTableState>({
    data: [],
    fetching: true, 
    page: 1,
    size: 10,
    total: 0,
    name: '',
  })

  const tabs: TabsLists[] = [
    {
      title: 'All',
      value: 'list',
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
        total: res.result.total || 0,
        fetching: false,
      })
    }
  };

  useEffect(() => {
    getTagList();
  }, [state.page]);


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

      <TabsContent value={tabs[0].value} className='relative'>
        <CardComponent
          title="Tag Lists"
          description="Manage your tag and view your tag.">
          
          <CardContent>
            {
              state.fetching && <FetchingData />
            }
            {state.data ? (
              <TagTable tags={state.data}/>
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
                {(state.page - 1) * state.size + 1}-{state.page * state.size}
              </strong>{' '}
              of <strong>{0}</strong> products
            </div>
          </CardFooter>
        
        </CardComponent>
      </TabsContent>

    </TabsComponent>
  );
}
