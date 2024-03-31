import { useState } from 'react';
import { LOCAL_STORAGE_CONSTATNT } from '../common/constant/storage.constant';
import { LocalStorageType } from '../common/type/storage.type';

export default function useAccessToken() {
  const [accessToken, SetAccessToken] = useState<string>('');

  const getSTR = (): LocalStorageType | null => {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CONSTATNT.name || '') || '',
    );
  };

  const GetToken = () => {
    const token = getSTR();
    if (!token) {
      return null;
    }

    SetAccessToken(token.token);

    return token.token;
  };

  const SetToken = (token: string) => {
    const LocalstorageObj: LocalStorageType = {
      token: token,
    };
    localStorage.setItem(
      LOCAL_STORAGE_CONSTATNT.name || '',
      JSON.stringify(LocalstorageObj),
    );
    return true;
  };

  return { accessToken, GetToken, SetToken };
}