import { FindBaseType } from './find.type';
import { RecordBase } from './table.type';
import { UserModifyBase } from './user.type';

export type PostType = {
  content: string;
  title: string;
  thumbnail: string | null;
};

export type PostEditType = {
  content: string;
  title: string;
  thumbnail: string | null;
};

export type PostFindItemType = RecordBase &
  PostType & {
    like: number;
    isLike?: boolean;
    user: ModifierPostType;
  };

export type PostModifier = {
  userUpdate: ModifierPostType;
  userCreate: ModifierPostType;
};

export type PostDetailType = PostFindItemType & {
  comment: PostComment1Type[];
};

export type PostCommentBaseType = RecordBase & {
  user: ModifierPostType;
  content: string;
  paramId: string | null;
  level: number;
};

export type PostComment1Type = PostCommentBaseType & {
  reply: PostComment2Type[];
};

export type PostComment2Type = PostComment3Type & {
  replyToReply: PostComment3Type[];
};
export type PostComment3Type = PostCommentBaseType & {
  replyToUser: ModifierPostType;
};

export type PostFindType = FindBaseType & {
  data: PostFindItemType[];
};

export type ModifierPostType = UserModifyBase & {
  email: string;
  birthDay: string; // YYYY-MM-DD
};
