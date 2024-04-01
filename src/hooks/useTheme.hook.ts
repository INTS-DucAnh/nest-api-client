import { ThemeEnum } from '@/common/enum/theme.enum';
import { ThemeContext } from '@/contexts/theme.context';
import { useContext, useEffect, useState } from 'react';

export default function useTheme() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [load, SetLoad] = useState(false);

  useEffect(() => {
    const change = (event: MediaQueryListEvent) => {
      changeTheme(event.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT);
    };
    const listenForTheme = window.matchMedia('(prefers-color-scheme: dark)');
    listenForTheme.addEventListener('change', change);

    changeTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeEnum.DARK
        : ThemeEnum.LIGHT,
    );
    return () => listenForTheme.removeEventListener('change', change);
  }, []);

  return { theme, changeTheme };
}
