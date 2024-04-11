import { UserModifyBase } from './user.type';

export type RecordBase = {
  id: string;
  createdDate: Date;
  updatedDate: Date;
};

export type RecordModifier = {
  userCreate?: UserModifyBase;
  userUpdate?: UserModifyBase;
  user?: UserModifyBase;
};
