import { ThemeEnum } from '@/common/enum/theme.enum';
import { createContext, ReactNode, useState } from 'react';

export interface ThemeContextType {
  theme: ThemeEnum;
  changeTheme: (theme: ThemeEnum) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeEnum.LIGHT,
  changeTheme: (theme: ThemeEnum) => null,
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, SetTheme] = useState<ThemeEnum>(ThemeEnum.LIGHT);

  const changeTheme = (theme: ThemeEnum) => {
    SetTheme(theme);
  };

  const contextValue: ThemeContextType = {
    theme: theme,
    changeTheme: changeTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
