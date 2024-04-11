import { ResponseRequest } from './method.type';
import { PostFindAdminType, PostFindItemType } from './post.type';
import { TagFindItemType, TagFindType } from './tag.type';
import { FindUserByEmail, SendOTPUser, UserLogin } from './user.type';

export interface LoginResult extends ResponseRequest {
  result: UserLogin;
}

export interface RefreshResult extends ResponseRequest {
  result: UserLogin;
}

export interface FindUserByEmailResult extends ResponseRequest {
  result: FindUserByEmail[];
}

export interface SendOTPResult extends ResponseRequest {
  result: SendOTPUser;
}

export interface CheckOTPResult extends ResponseRequest {
  result: string;
}

export interface ResetPasswordResult extends ResponseRequest {
  result: string;
}

export interface FindTagResult extends ResponseRequest {
  result: TagFindType;
}

export interface UpdateTagResult extends ResponseRequest {
  result: TagFindItemType;
}

export interface MostLikeResult extends ResponseRequest {
  result: PostFindItemType[];
}

export interface PostAdminFindResult extends ResponseRequest {
  result: PostFindAdminType;
}
