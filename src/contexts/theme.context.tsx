import { ThemeEnum } from '@/common/enum/theme.enum';
import { createContext, ReactNode, useState } from 'react';

export interface ThemeContextType {
  theme: ThemeEnum;
  changeTheme: (theme: ThemeEnum) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeEnum.LIGHT,
  changeTheme: () => null,
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, SetTheme] = useState<ThemeEnum>(ThemeEnum.LIGHT);

  const changeTheme = (theme: ThemeEnum) => {
    SetTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
