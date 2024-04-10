import { REQUEST_PATH } from '@/common/constant/api.constant';
import { SignupFormSchema } from '@/common/schema/signup.schema';
import RenderFormItem from '@/components/form-item';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import useRequest from '@/hooks/useRequestApi.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

export default function SignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const { post } = useRequest();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      year: new Date().getFullYear() - 1,
      month: 1,
      date: 1,
      name: '',
    },
  });

  function getDatesOfMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  const onSubmit = async (data: z.infer<typeof SignupFormSchema>) => {
    const { month, year, date, ...info } = data;
    const format = `yyyy/mm/dd`;

    const birthDay = format.replace('yyyy', year.toString()).replace('mm', month.toString()).replace('dd', date.toString());

    const res = await post({
      path: REQUEST_PATH.user.signup(),
      headers: {
        'Content-type': 'application/json',
      },
      body: {
        ...info,
        birthDay: birthDay,
      },
    });
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
        <div className='flex flex-col gap-3 text-left'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <RenderFormItem label='Fullname' require>
                <Input placeholder='Fullname' {...field} />
              </RenderFormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <RenderFormItem label='Email' require>
                <Input placeholder='Email' {...field} />
              </RenderFormItem>
            )}
          />
          <div className='w-[400px] grid grid-cols-3 grid-rows-1 place-items-start gap-2'>
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => {
                const { month, year, ...data } = form.getValues();
                const dayCount = new Array(getDatesOfMonth(year, month)).fill(0);

                return (
                  <RenderFormItem label='Date' require>
                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger className='w-full overflow-hidden'>
                          <SelectValue placeholder='Select date' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dayCount.map((day, id) => {
                          return (
                            <SelectItem value={(id + 1).toString()} key={id + 1}>
                              {id + 1}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </RenderFormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='month'
              render={({ field }) => {
                const { year, ...data } = form.getValues();
                const monthCount = new Array(12).fill(0);

                return (
                  <RenderFormItem label='Month' require>
                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger className='w-full overflow-hidden'>
                          <SelectValue placeholder='Select date' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {monthCount.map((month, id) => {
                          return (
                            <SelectItem value={(id + 1).toString()} key={id + 1}>
                              {id + 1}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </RenderFormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='year'
              render={({ field }) => {
                const currentYear = new Date().getFullYear();
                const yearCount = new Array(50).fill(0);

                return (
                  <RenderFormItem label='Year' require>
                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger className='w-full overflow-hidden'>
                          <SelectValue placeholder='Select date' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {yearCount.map((_, id) => {
                          return (
                            <SelectItem value={(currentYear - id - 1).toString()} key={currentYear - id - 1}>
                              {currentYear - id - 1}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </RenderFormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <RenderFormItem label='Password' require>
                <Input placeholder='Password' type='password' {...field} />
              </RenderFormItem>
            )}
          />
        </div>

        <Button type='submit' className='w-full mt-5'>
          Signup
        </Button>
        <Separator className='mt-3 mb-3' />
        <p className='text-sm w-full text-center m-0'>
          Have an account?{' '}
          <Link to={'/login'} className='text-primary hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
