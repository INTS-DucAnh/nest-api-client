import { ReactNode } from 'react';

export default function EmptyTable(
{
  addRecord, 
  mainText, 
  subtitle,
}: {
  mainText: string, 
  subtitle: string, 
  addRecord: ReactNode
}) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-32">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          {mainText}
        </h3>
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
        <div className="mt-5">
          {addRecord}
        </div>
      </div>
    </div>)
}