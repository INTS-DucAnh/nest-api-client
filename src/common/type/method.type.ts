import { MethodEnum } from '../enum/api.enum';
import { ErrorCodeEnum } from '../enum/error-code.enum';

export type QueryType = {
  key: string;
  value: string | number | string[] | number[];
};

interface BaseMethodType {
  path: string;
  credentials: boolean;
  headers: HeadersInit;
}

export interface GetMethodType extends BaseMethodType {
  query?: QueryType[];
  param?: string | number;
}

export interface PostMethodType extends BaseMethodType {
  formData?: FormData;
  body?: object;
}

export interface PutMethodType extends BaseMethodType {
  query?: QueryType[];
  param?: string | number;
  body?: object;
  formData?: FormData;
}

export interface DeleteMethodType extends BaseMethodType {
  query?: QueryType[];
  param?: string | number;
  body?: object;
  formData?: FormData;
}

export interface ResponseRequest {
  status: number;
  code: ErrorCodeEnum;
  message?: string;
  result?: object | object[];
}

export interface RequestOption extends RequestInit {
  method: MethodEnum;
  path: string;
  data?: object;
  formData?: FormData;
}
