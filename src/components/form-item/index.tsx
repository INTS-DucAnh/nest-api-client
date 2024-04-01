import { ReactNode } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';

export default function RenderFormItem({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>

      <FormMessage />
    </FormItem>
  );
}
