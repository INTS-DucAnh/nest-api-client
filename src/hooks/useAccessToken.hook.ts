import { LOCAL_STORAGE_CONSTATNT } from "../common/constant/storage.constant";
import { LocalStorageType } from "../common/type/storage.type";

export default function useAccessToken() {
  const getSTR = (): LocalStorageType | null => {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CONSTATNT.name || "") || "{}"
    );
  };

  const GetToken = () => {
    const token = getSTR();
    if (!token) {
      return null;
    }
    return token.token;
  };

  const SetToken = (token: string) => {
    const LocalstorageObj: LocalStorageType = {
      token: token,
    };
    localStorage.setItem(
      LOCAL_STORAGE_CONSTATNT.name || "",
      JSON.stringify(LocalstorageObj)
    );
    return true;
  };

  const ClearToken = () => {
    const str = getSTR();
    if (str?.token) {
      const { token, ...lcStr } = str;
      localStorage.setItem(
        LOCAL_STORAGE_CONSTATNT.name || "",
        JSON.stringify(lcStr)
      );
    }
  };

  return { SetToken, GetToken, ClearToken };
}
