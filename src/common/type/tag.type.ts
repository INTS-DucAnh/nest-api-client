import { FindBaseType } from './find.type';
import { UserModifyBase } from './user.type';

export type TagType = {
  name: string;
};

export type TagEditType = {
  name: string;
};

export type TagFindItemType = {
  id: string,
  createdDate: Date,
  updatedDate: Date,
  name: string,
  userCreate: UserModifyBase,
  userUpdate: UserModifyBase
}

export type TagFindType = FindBaseType & {
  data: TagFindItemType[]
}