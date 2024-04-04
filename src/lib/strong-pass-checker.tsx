import { Card } from '@/components/ui/card';

type ChecklistItem = {
  requirement: string,
  regexp: RegExp,
}

export const Checklist:ChecklistItem[] = [
  {
    requirement: 'At least 8 characters long',
    regexp: /^.{8,}$/,
  },
  {
    requirement: 'At least 1 uppercase',
    regexp: /^(?=.*[A-Z]).*$/,
  },
  {
    requirement: 'At least 1 lowercase',
    regexp: /^(?=.*[a-z]).*$/,
  },
  {
    requirement: 'At least 1 number',
    regexp: /^(?=.*\d).*$/,
  },
  {
    requirement: 'At least 1 symbol',
    regexp: /^(?=.*[!@#$%^&*()_+{}[\]:;'"?><.,|\\/~`=-]).*$/,
  },
]

export default function PasswordStrengthChecker(
  {password, correct = 'text-foreground', error = 'text-muted-foreground', show = false}: 
  {password:string, correct?: string, error?: string, show?: boolean})
{

  if(!show) return <></>;

  return (
    <Card className='w-full p-2 mt-2'>
      <ul>
        {
          Checklist.map(check =>  (
          <li 
          key={check.requirement} 
          className={`${check.regexp.test(password) ? `${correct} line-through` : `${error} italic`} text-xs pl-3`}>
            {check.requirement}
          </li>
          ))
        }        
      </ul>

    </Card>
  );
};
