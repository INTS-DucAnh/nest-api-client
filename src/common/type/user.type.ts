import { RoleUserEnum } from '../enum/user.enum';

export type UserType = {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  role: RoleUserEnum;
};

export type UserLoginInfo = {
  id: string,
  name: string,
  email: string,
  avatar: string | null,
  role: RoleUserEnum
}

export type UserLogin = {
  user: UserLoginInfo;
  refreshToken?: string;
  accessToken: string;
};

export type FindUserByEmail = {
  role: RoleUserEnum,
  name: string,
  birthDay: Date | null,
  id: string,
  email: string,
  avatar: string | null,
}

export type SendOTPUser = {
  expired: number;
}

// export type UserLogin = {};
