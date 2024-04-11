import { FindBaseType } from './find.type';
import { RecordBase, RecordModifier } from './table.type';

export type TagType = {
  name: string;
};

export type TagEditType = {
  name: string;
};

export type TagFindItemType = RecordModifier &
  RecordBase & {
    name: string;
  };

export type TagFindType = FindBaseType & {
  data: TagFindItemType[];
};

export type SelectMutipleTagItem = {
  id: string;
  name: string;
};
