import CardComponent, { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function StageForgotPassword({
  dir, 
  title, 
  description, 
  Component,
  onSuccess,
}: 
{
  dir: number,
  title: string, 
  description: string, 
  stage?: number, 
  Component: React.FC<{className: string, onSuccess: ()=> void}>,
  onSuccess: ()=> void
}) {

  return (
    <CardComponent title={title} description={description}>
      <CardContent>
        <Separator className='mb-5'/>
        <Component className={`${dir < 0 ? 'animate-appear-right':'animate-appear-left'}`} onSuccess={onSuccess}/>
      </CardContent>
    </CardComponent>)
}