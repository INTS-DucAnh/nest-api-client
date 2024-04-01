import * as z from 'zod';
import { StrongPassword } from './base.schema';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email('Email must be in Email format. \nEx: example@gmail.com'),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .superRefine((password: string, checkPassComplexity: z.RefinementCtx) => {
      StrongPassword(password, checkPassComplexity);
    }),
});
