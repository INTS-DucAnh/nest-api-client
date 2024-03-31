import { ThemeContext, ThemeContextType } from '@/contexts/theme.context';
import { useContext } from 'react';

export default function useTheme() {
  const { theme, changeTheme } = useContext<ThemeContextType>(ThemeContext);

  return { theme, changeTheme };
}
