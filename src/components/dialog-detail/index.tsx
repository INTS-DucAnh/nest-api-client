import { ReactNode } from 'react';
import { DialogDetail, DialogContentDetail, DialogDescriptionDetail, DialogHeaderDetail, DialogTitleDetail, DialogTriggerDetail } from '../ui/dialog-detail';

export default function DialogComponentDetail({
  trigger,
  title,
  description,
  children,
}: {
  trigger: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <DialogDetail>
      <DialogTriggerDetail asChild>{trigger}</DialogTriggerDetail>
      <DialogContentDetail className=''>
        {/* <DialogContent className="sm:max-w-md"> */}
        <DialogHeaderDetail>
          <DialogTitleDetail className='font-bold tracking-tight text-2xl'>{title}</DialogTitleDetail>
          <DialogDescriptionDetail className='text-sm text-muted-foreground'>{description}</DialogDescriptionDetail>
          {children}
        </DialogHeaderDetail>
      </DialogContentDetail>
    </DialogDetail>
  );
}
