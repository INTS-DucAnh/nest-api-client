import { ResponseRequest } from './method.type';
import { FindUserByEmail, SendOTPUser, UserLogin } from './user.type';

export interface LoginResult extends ResponseRequest {
  result: UserLogin
};

export interface RefreshResult extends ResponseRequest {
  result: UserLogin
};

export interface FindUserByEmailResult extends ResponseRequest {
  result: {
    users: FindUserByEmail[]
  }
}

export interface SendOTPResult extends ResponseRequest {
  result: SendOTPUser
}