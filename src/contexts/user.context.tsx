import { UserType } from '@/common/type/user.type';
import { createContext, ReactNode, useState } from 'react';

export interface UserContextType {
  user: UserType | null;
  set: (user: UserType) => void;
  reset: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  set: (user: UserType) => null,
  reset: () => null,
});

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, SetUser] = useState<UserType | null>(null);

  const set = (user: UserType) => {
    SetUser(user);
  };

  const reset = () => {
    SetUser(null);
  };

  const providerValue: UserContextType = {
    user: user,
    set,
    reset,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}
