import { REQUEST_PATH } from '@/common/constant/api.constant';
import { LoginFormSchema } from '@/common/schema/login.schema';
import { LoginResult } from '@/common/type/result.type';
import RenderFormItem from '@/components/form-item';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { UserContext, UserContextType } from '@/contexts/user.context';
import useAccessToken from '@/hooks/useAccessToken.hook';
import useRequest from '@/hooks/useRequestApi.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as z from 'zod';

export default function LoginForm() {
  const { post } = useRequest();
  const { toast } = useToast();
  const { SetToken } = useAccessToken();
  const userContext = useContext<UserContextType>(UserContext);
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    const res = await post<LoginResult>({
      path: REQUEST_PATH.auth.login(),
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });
    if (res) {
      toast({
        title: 'Successfully',
        description: 'Login successfully',
      });

      userContext.set(res.result.accessToken);
      SetToken(res.result.accessToken);
    }
  };
  return (
    <Form {...form}>
      <Separator />
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <div className="flex flex-col gap-3 text-left">
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
            render={({ field }) => (<>
              <RenderFormItem label="Password">
                <Input
                  placeholder="Your account password"
                  type="password"
                  {...field}
                />
              </RenderFormItem>
              <p className="text-xs w-full text-right">
                  <Link
                    to={'/forgot-password'}
                    className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </p>
            </>)}
          />
        </div>

        <Button type="submit" className="w-full mt-5">
          Login
        </Button>

        <Separator className="mt-3 mb-3" />
        <p className="text-sm w-full text-center m-0">
          Don't have an account?{' '}
          <Link to={'/signup'} className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </Form>
  );
}
