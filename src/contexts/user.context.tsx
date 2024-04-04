import { UserLoginInfo } from '@/common/type/user.type';
import { createContext, ReactNode, useState } from 'react';
import * as jwt_decode from 'jwt-decode';

export interface UserContextType {
  user: UserLoginInfo | null;
  set: (token: string | null) => void;
  reset: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  set: (token: string | null) => null,
  reset: () => null,
});

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, SetUser] = useState<UserLoginInfo | null>(null);

  const set = (token: string | null) => {
    if(!token) return;
    const decoded:UserLoginInfo = jwt_decode.jwtDecode(token);
    SetUser(decoded);
    return decoded;
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
