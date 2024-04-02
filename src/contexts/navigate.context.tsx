import { NavigationItem } from '@/common/type/nav.type';
import { createContext, ReactNode, useState } from 'react';

export interface NavigateContextType {
  previous: NavigationItem[];
  add: (bread: NavigationItem) => void;
  remove: (from: number) => void;
  replace: (item: number, bread: NavigationItem) => void;
  reset: () => void;
}

export const NavigateContext = createContext<NavigateContextType>({
  previous: [],
  add: (bread: NavigationItem) => {},
  remove: (from: number) => {},
  replace: (item: number, bread: NavigationItem) => {},
  reset: () => {},
});

export default function NavigateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [previous, SetPrevious] = useState<NavigationItem[]>([]);

  const add = (bread: NavigationItem) => {
    const pos = previous.indexOf(bread);
    pos && SetPrevious((prev) => [...prev, bread]);
  };

  const remove = (from: number) => {
    SetPrevious((prev) => prev.filter((_, id) => id < from - 1));
  };

  const replace = (pos: number, bread: NavigationItem) => {
    SetPrevious((prev) => {
      const newPrev = prev.filter((_, id) => id < pos);
      newPrev.push(bread);

      return newPrev;
    });
  };

  const reset = () => {
    SetPrevious([]);
  };

  const providerValue: NavigateContextType = {
    previous,
    add,
    remove,
    replace,
    reset,
  };

  return (
    <NavigateContext.Provider value={providerValue}>
      {children}
    </NavigateContext.Provider>
  );
}
