import { PATH_BASE, PRIVATE_NAV_COMPO } from '@/common/constant/nav.constant';
import { NavigationItem } from '@/common/type/nav.type';
import useNavigator from '@/hooks/useNavigator.hook';
import { BracesIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../theme-switcher';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import ToolTip from '../ui/tooltip';

export default function PrivateNavigation() {
  const { previous } = useNavigator();
  const navigate = useNavigate();

  return (
    <aside className="h-full w-fit">
      <Card className="h-full w-72 rounded-none flex flex-col justify-start items-start">
        <Link
          className="h-fit w-full box-border p-4 px-7 flex gap-3 items-center"
          to={PATH_BASE.admin}>
          <BracesIcon className="h-6 w-6 font-bold text-foreground" />
          <p className=" font-semibold text-foreground">NestJS API</p>
        </Link>
        <Separator />
        <div className="flex-1 flex flex-col w-full">
          <ScrollArea className="flex-1">
            <div className="h-full w-full flex flex-col gap-3 box-border p-2 px-3">
              {Object.entries(PRIVATE_NAV_COMPO).map(
                ([target, comp]: [target: string, comp: NavigationItem]) => {
                  const Icon = comp.icon;
                  return (
                    <ToolTip
                      key={comp.title}
                      trigger={
                        <Button
                          variant="ghost"
                          onClick={() => {
                            navigate(comp.path);
                          }}
                          className={`${previous && previous.pop()?.title === comp.title && 'bg-accent hover:text-foreground'} flex gap-2 items-center justify-start hover:bg-transparent hover:text-foreground text-muted-foreground`}>
                          <Icon className={`font-bold text-xl h-4 w-4`} />
                          <p className="text-sm">{comp.title}</p>
                        </Button>
                      }
                      text={comp.title}
                      dur={200}
                      side="right"
                    />
                  );
                },
              )}
            </div>
          </ScrollArea>
          <div className="w-full p-4 flex gap-3 justify-end">
            <ThemeSwitcher />
          </div>
        </div>
      </Card>
    </aside>
  );
}
