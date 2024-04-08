import { REQUEST_PATH } from '@/common/constant/api.constant';
import { CategoryFormSchema } from '@/common/schema/category.schema';
import { CategoryFindItemType } from '@/common/type/category.type';
import { FormMethodType } from '@/common/type/form.type';
import { UpdateTagResult } from '@/common/type/result.type';
import RenderFormItem from '@/components/form-item';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import useRequest from '@/hooks/useRequestApi.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const TextForm = {
  update: {
    confirm: 'Update',
    updating: 'Updating Category',
  },
  create: {
    confirm: 'Create',
    updating: 'Creating Category',
  },
};

export default function CategoryForm({ category, onSuccess }: { category?: CategoryFindItemType; onSuccess: () => void }) {
  const { post, put } = useRequest();
  const [type, SetType] = useState<FormMethodType>(category ? 'update' : 'create');
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: category?.name || '',
    },
  });
  const [loading, SetLoading] = useState<boolean>(false);

  const defMethod = () => (category ? put : post);

  const onSubmit = async (data: z.infer<typeof CategoryFormSchema>) => {
    SetLoading(true);

    const method = defMethod();

    const res = await method<UpdateTagResult>({
      path: !category ? REQUEST_PATH.category.create() : REQUEST_PATH.category.update(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: !category
        ? data
        : {
            ...data,
            id: category.id,
          },
      token: true,
    });
    SetLoading(false);

    if (res) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-5'>
        <div className='flex flex-col gap-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <RenderFormItem label='Category Name' require>
                <Input placeholder='Category Name' {...field} />
              </RenderFormItem>
            )}
          />
        </div>
        <DialogFooter className='h-fit mt-5 '>
          <DialogClose>
            <Button type='button' variant='outline'>
              Close
            </Button>
          </DialogClose>

          <Button disabled={loading} type='submit' className='w-fit float-right'>
            {loading ? (
              <>
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> <p>{TextForm[type].updating}</p>
              </>
            ) : (
              <p>{TextForm[type].confirm}</p>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
