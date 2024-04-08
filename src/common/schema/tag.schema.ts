import * as z from 'zod';

export const TagFormSchema = z.object({
  name: z.string().min(2, { message: 'Tag name must be at least 2 characters' }),
});
