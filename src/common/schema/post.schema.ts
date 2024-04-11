import * as z from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title can not be empty'),
  content: z.string().min(1, 'Title can not be empty'),
  idCategory: z.array(z.string()).optional(),
  idTag: z.array(z.string()).optional(),
  thumbnail: z.string().min(1, 'Thumbnail can not be empty'),
});
