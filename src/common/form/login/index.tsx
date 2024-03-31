import { FormTypeEnum } from '@/common/enum/form.enum';
import { FormType } from '@/common/type/form.type';

export const LoginForm: FormType = {
  label: 'Login',
  type: FormTypeEnum.CREATE,
  section: [
    {
      label: 'Account',
      require: true,
      fields: [
        [
          {
            label: 'username',
            require: true,
            error: [],
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <input placeholder="username" {...props} />
            ),
          },
        ],
        [
          {
            label: 'password',
            require: true,
            error: [],
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <input placeholder="password" {...props} />
            ),
          },
        ],
      ],
    },
  ],
};
