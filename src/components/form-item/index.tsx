import { ReactNode } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';

export default function RenderFormItem({
  children,
  label,
  require = false,
}: {
  children: ReactNode;
  label: string;
  require?: boolean;
}) {
  return (
    <FormItem>
      <FormLabel>
        <div className="flex">
          <p className="text-sm">{label}</p>
          {require && <p className=" text-destructive">*</p>}
        </div>
      </FormLabel>
      <FormControl>{children}</FormControl>

      <FormMessage />
    </FormItem>
  );
}
