import * as z from 'zod';

export const CategoryFormSchema = z.object({
  name: z.string().min(2, { message: 'Category name must be at least 2 characters' }),
});
