import { FindBaseType } from './find.type';
import { RecordBase, RecordModifier } from './table.type';

export type CategoryType = {
  name: string;
};

export type CategoryEditType = {
  name: string;
};

export type CategoryFindItemType = RecordModifier &
  RecordBase & {
    name: string;
  };

export type TagFindType = FindBaseType & {
  data: CategoryFindItemType[];
};
