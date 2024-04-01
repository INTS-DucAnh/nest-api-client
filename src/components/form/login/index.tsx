import { REQUEST_PATH } from '@/common/constant/api.constant';
import { LoginFormSchema } from '@/common/schema/login.schema';
import RenderFormItem from '@/components/form-item';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import useRequest from '@/hooks/useRequestApi.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

export default function LoginForm() {
  const { post } = useRequest();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    post({
      path: REQUEST_PATH.auth.login(),
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
      token: false,
    });
  };
  return (
    <Form {...form}>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <RenderFormItem label="Email">
                <Input placeholder="Your email" {...field} />
              </RenderFormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <RenderFormItem label="Password">
                <Input
                  placeholder="Your account password"
                  type="password"
                  {...field}
                />
              </RenderFormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-5">
          Login
        </Button>
        <Separator className="mt-3 mb-1" />
        <p className="text-sm w-full text-center m-0">
          Don't have an account?{' '}
          <Link to={'/signup'} className="text-primary">
            Create an account
          </Link>
        </p>
      </form>
    </Form>
  );
}
