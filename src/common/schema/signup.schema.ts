import * as z from 'zod';
import { StrongPassword } from './base.schema';

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Fullname must be at least 5 characters. ' }),
  date: z.coerce
    .number()
    .int(),
  month: z.coerce
  .number()
  .int(),
  year: z.coerce
  .number()
  .int()
  .superRefine((year: number, checkPassComplexity: z.RefinementCtx) => {
    if(new Date().getFullYear() - year < 14) {
      checkPassComplexity.addIssue({
        code: 'custom',
        message: 'User must be at least 14 year old',
      });
    }
  }),
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
