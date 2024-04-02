import * as z from 'zod';
import { StrongPassword } from './base.schema';

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Fullname must be at least 5 characters. ' }),
  age: z.coerce
    .number()
    .int()
    .gte(18, { message: 'You must be 18 year old to signup.' }),
  email: z
    .string()
    .min(1, { message: 'Email must be provide' })
    .email('Email must be in email format. \nEx: example@gmail.com. '),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .superRefine((password: string, checkPassComplexity: z.RefinementCtx) => {
      StrongPassword(password, checkPassComplexity);
    }),
});
