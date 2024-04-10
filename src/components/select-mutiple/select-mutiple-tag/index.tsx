import { REQUEST_PATH } from '@/common/constant/api.constant';
import { FindTagResult } from '@/common/type/result.type';
import { SelectMutipleTagItem, TagFindItemType } from '@/common/type/tag.type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import useDebounce from '@/hooks/useDebounce.hook';
import useRequest from '@/hooks/useRequestApi.hook';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CircleXIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SelectMutipleTag({
  onChange,
  defaultValue = [],
}: {
  onChange: (id: string) => void;
  defaultValue: SelectMutipleTagItem[];
}) {
  const [size, SetSize] = useState<number>(10);
  const [page, SetPage] = useState<number>(1);
  const [total, SetTotal] = useState<number>(10);
  const [key, SetKey] = useState<string>('');
  const [listSelect, SetListSelect] = useState<SelectMutipleTagItem[]>(defaultValue);
  const [list, SetList] = useState<TagFindItemType[]>([]);
  const { get } = useRequest();
  const { SetListen, debounced, listen } = useDebounce<string>({ initValue: key, delay: 500 });

  const getListTag = async () => {
    const res = await get<FindTagResult>({
      path: REQUEST_PATH.tag.find(),
      query: [
        { key: 'size', value: size },
        { key: 'page', value: page },
        { key: 'name', value: debounced },
      ],
      token: false,
    });

    if (res) {
      SetList(res.result.data);
      SetTotal(res.result.total || 0);
    }
  };

  const handleSelect = (item: TagFindItemType | SelectMutipleTagItem) => {
    onChange(item.id);
    SetListSelect(list =>
      list.findIndex(e => e.id === item.id) !== -1 ? list.filter(e => e.id !== item.id) : [...list, { id: item.id, name: item.name }],
    );
  };

  useEffect(() => {
    getListTag();
  }, [debounced, page]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='w-full h-fit flex gap-2 flex-wrap border box-border p-2 px-3 rounded-lg text-sm text-muted-foreground'>
          {listSelect.length
            ? listSelect.map(select => (
                <Button
                  variant={'secondary'}
                  key={select.id}
                  className='w-fit h-fit rounded-3xl p-1 px-3 flex gap-1 items-center text-muted-foreground'
                  onClick={e => {
                    e.preventDefault();
                    handleSelect(select);
                  }}
                >
                  <p className='text-xs'>{select.name}</p>
                  <CircleXIcon className='w-3 h-3' />
                </Button>
              ))
            : 'Select Tags'}
        </div>
      </PopoverTrigger>
      <PopoverContent side='top' align='start' className=' w-80 h-fit'>
        <div className='flex gap-2'>
          <Input
            placeholder='Tag name'
            onChange={e => {
              SetListen(e.target.value);
              SetPage(1);
            }}
            value={listen}
            className='flex-1'
          />
          <Button variant={'outline'} size={'icon'} disabled={page === 1} onClick={() => SetPage(page => page - 1)}>
            <ChevronLeftIcon className='w-3 h-3' />
          </Button>
          <Button variant={'outline'} size={'icon'} disabled={page * size >= total} onClick={() => SetPage(page => page + 1)}>
            <ChevronRightIcon className='w-3 h-3' />
          </Button>
        </div>

        <ScrollArea className='w-full h-56 mt-2'>
          <div>
            {list.length ? (
              list.map(l => (
                <Button
                  key={l.id}
                  variant={'ghost'}
                  className='w-full text-muted-foreground text-xs text-left flex items-center justify-start gap-2'
                  onClick={() => {
                    // onChange(l.id);
                    handleSelect(l);
                  }}
                >
                  <p className='flex-1'>{l.name}</p>
                  {listSelect.findIndex(e => e.id === l.id) !== -1 ? <CheckIcon className='w-3 h-3 text-white' /> : <></>}
                </Button>
              ))
            ) : (
              <p className='text-xs text-muted-foreground text-center w-full mt-3'>No result match</p>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
