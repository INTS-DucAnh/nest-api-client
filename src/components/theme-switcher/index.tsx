import { ThemeEnum } from '@/common/enum/theme.enum';
import useTheme from '@/hooks/useTheme.hook';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '../ui/button';
import ToolTip from '../ui/tooltip';

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();
  return (
    <ToolTip
      trigger={
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={() => {
            changeTheme(
              theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK,
            );
          }}>
          {theme === ThemeEnum.DARK ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </Button>
      }
      text="Switch Theme"
      side="right"
      dur={200}
    />
  );
}
