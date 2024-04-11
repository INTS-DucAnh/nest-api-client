import { ReactNode } from 'react';

export default function FooterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='w-fit mb-3'>
        <p className='w-fit text-sm font-semibold'>{title}</p>
      </div>
      <div className='flex flex-col w-full gap-3 items-start text-muted-foreground text-sm'>{children}</div>
    </div>
  );
}
