import { RoleUserEnum } from '../enum/user.enum';

export type UserType = {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  role: RoleUserEnum;
};
