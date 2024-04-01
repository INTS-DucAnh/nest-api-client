import * as z from 'zod';
import { StrongPassword } from './base.schema';

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Fullname must be at least 5 characters. ' }),
  age: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number()
      .int()
      .positive()
      .min(18, { message: 'You must be 18 year old to signup.' })
      .max(100, { message: '100 year old is maximum.' }),
  ),
  email: z
    .string()
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
