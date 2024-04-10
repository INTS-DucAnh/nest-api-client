import { REQUEST_PATH, REQUEST_URL } from '@/common/constant/api.constant';
import { CreatePostSchema } from '@/common/schema/post.schema';
import { FormMethodType } from '@/common/type/form.type';
import { PostAdminFindItemType } from '@/common/type/post.type';
import RenderFormItem from '@/components/form-item';
import SelectMutipleCategory from '@/components/select-mutiple/select-mutiple-category';
import SelectMutipleTag from '@/components/select-mutiple/select-mutiple-tag';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import useRequest from '@/hooks/useRequestApi.hook';
import ConvertFileToBase64 from '@/lib/convert-file-base-64';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { XIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const TextForm = {
  update: {
    confirm: 'Update',
    updating: 'Updating Post',
  },
  create: {
    confirm: 'Create',
    updating: 'Creating Post',
  },
};

export default function PostForm({
  posts,
  onSuccess,
  mainClassName,
}: {
  mainClassName?: string;
  onSuccess: () => void;
  posts?: PostAdminFindItemType;
}) {
  const { post, put } = useRequest();
  const { toast } = useToast();
  const [type, SetType] = useState<FormMethodType>(posts ? 'update' : 'create');
  const [tempThumbnail, SetTempThumbnai] = useState<{ base64: string; file?: File } | null>(
    posts && posts.thumbnail
      ? {
          base64: `${REQUEST_URL}/${posts.thumbnail}`,
        }
      : null,
  );
  const [loading, SetLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: posts
      ? {
          content: posts.content,
          title: posts.title,
          idCategory: posts.category.data.map(cate => cate.id),
          idTag: posts.tag.data.map(tag => tag.id),
          thumbnail: posts.thumbnail || '',
        }
      : {
          content: '',
          title: '',
          idCategory: [],
          idTag: [],
          thumbnail: '',
        },
  });

  const onChange = (type: 'idTag' | 'idCategory') => (id: string) => {
    const tags = form.getValues(type) || [];
    form.setValue(type, tags.includes(id) ? tags.filter(e => e !== id) : [...tags, id]);
  };

  const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      SetTempThumbnai(null);
      return;
    }

    if (!event.target.files.length) {
      return;
    }
    const file = event.target.files[0];
    const tempBase64 = (await ConvertFileToBase64(file)) as string;

    SetTempThumbnai({
      file: file,
      base64: tempBase64,
    });
    form.setValue('thumbnail', tempBase64);
  };

  const methodForm = () => (posts ? put : post);

  const onSubmit = async (data: z.infer<typeof CreatePostSchema>) => {
    const formData = new FormData();
    SetLoading(true);

    if (tempThumbnail !== null && tempThumbnail.file) {
      formData.append('thumbnail', tempThumbnail.file);
    }

    if (posts) {
      formData.append('id', posts.id);
    }

    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('idTags', JSON.stringify(data.idTag));
    formData.append('idCategorys', JSON.stringify(data.idCategory));

    const method = methodForm();

    const res = await method({
      path: posts ? REQUEST_PATH.post.create() : REQUEST_PATH.post.update(),
      formData: formData,
      token: true,
    });
    SetLoading(false);
    if (res) {
      toast({
        title: 'Signup Successfully',
        description: 'Signup successfully please login.',
      });
      if (onSuccess !== undefined) onSuccess();
    }
  };

  return (
    <Form {...form}>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className={`w-full ${mainClassName}`}>
          <div className='flex flex-col text-left w-full gap-5'>
            <FormField
              control={form.control}
              name='thumbnail'
              render={({ field }) => {
                return (
                  <RenderFormItem label='Thumbnail'>
                    <div className='w-fit'>
                      <div className='w-60 aspect-video rounded-xl overflow-hidden border grid place-items-center relative'>
                        {tempThumbnail ? (
                          <>
                            <img src={tempThumbnail.base64} className='h-full w-full object-cover' alt='post' />
                            <Button
                              variant={'outline'}
                              size={'icon'}
                              className='absolute right-2 top-2 z-[1] w-fit h-fit p-1 rounded-full'
                              onClick={() => {
                                SetTempThumbnai(null);
                                form.setValue('thumbnail', '');
                              }}
                            >
                              <XIcon className='w-3 h-3 text-muted-foreground' />
                            </Button>
                          </>
                        ) : (
                          <p className='text-xs text-muted-foreground'>No thumbnail provide</p>
                        )}
                      </div>
                      <div className='mt-5 relative'>
                        <Label
                          className='p-2 px-5 text-background cursor-pointer hover:bg-secondary w-fit bg-primary rounded-md'
                          htmlFor='post_select_thumb'
                        >
                          Select file
                        </Label>
                        <Input
                          type='file'
                          id='post_select_thumb'
                          accept='image/*'
                          multiple={false}
                          value={''}
                          className='w-full h-full invisible absolute top-0 left-0'
                          onChange={e => handleFileInputChange(e)}
                        />
                      </div>
                    </div>
                  </RenderFormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <RenderFormItem label='Title' require>
                  <Input placeholder='Title' {...field} />
                </RenderFormItem>
              )}
            />

            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <RenderFormItem label='Content' require>
                  <Textarea placeholder='Content' className=' resize-none h-[200px]' {...field} />
                </RenderFormItem>
              )}
            />

            <FormField
              control={form.control}
              name='idTag'
              render={({ field }) => (
                <RenderFormItem label='Tags'>
                  <SelectMutipleTag
                    defaultValue={posts ? posts.category.data.map(cate => ({ id: cate.id, name: cate.name })) : []}
                    onChange={onChange('idTag')}
                  />
                </RenderFormItem>
              )}
            />

            <FormField
              control={form.control}
              name='idCategory'
              render={({ field }) => (
                <RenderFormItem label='Cateogires'>
                  <SelectMutipleCategory onChange={onChange('idCategory')} />
                </RenderFormItem>
              )}
            />
          </div>
        </ScrollArea>

        <Button disabled={loading} type='submit' className='w-full float-right mt-3'>
          {loading ? (
            <>
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> <p>{TextForm[type].updating}</p>
            </>
          ) : (
            <p>{TextForm[type].confirm}</p>
          )}
        </Button>
      </form>
    </Form>
  );
}
