import { REQUEST_PATH } from '@/common/constant/api.constant';
import { LoginFormSchema } from '@/common/schema/login.schema';
import { SignupFormSchema } from '@/common/schema/signup.schema';
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

export default function SignupForm() {
  const { post } = useRequest();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      age: 18,
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    post({
      path: REQUEST_PATH.auth.signup(),
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
            name="name"
            render={({ field }) => (
              <RenderFormItem label="Fullname">
                <Input placeholder="Fullname" {...field} />
              </RenderFormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <RenderFormItem label="Email">
                <Input placeholder="Email" {...field} />
              </RenderFormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <RenderFormItem label="Age">
                <Input placeholder="Age" type="number" {...field} />
              </RenderFormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <RenderFormItem label="Password">
                <Input placeholder="Password" type="password" {...field} />
              </RenderFormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-5">
          Signup
        </Button>
        <Separator className="mt-3 mb-1" />
        <p className="text-sm w-full text-center m-0">
          Have an account?{' '}
          <Link to={'/login'} className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
