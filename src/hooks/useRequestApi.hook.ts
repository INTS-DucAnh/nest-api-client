import { useToast } from '@/components/ui/use-toast';
import { REQUEST_HOST, REQUEST_PATH } from '../common/constant/api.constant';
import { ERROR_MESSSAGE } from '../common/constant/message.constant';
import { MethodEnum } from '../common/enum/api.enum';
import { ErrorCodeEnum } from '../common/enum/error-code.enum';
import {
  DeleteMethodType,
  GetMethodType,
  PostMethodType,
  PutMethodType,
  QueryType,
  RequestOption,
  ResponseRequest,
} from '../common/type/method.type';
import { RefreshTokenResult } from '../common/type/result.type';
import userAccessToken from './useAccessToken.hook';

export interface RefreshTokenReponse extends ResponseRequest {
  result: RefreshTokenResult;
}

export default function useRequest() {
  const { toast } = useToast();
  const { GetToken, SetToken } = userAccessToken();

  const post = (params: PostMethodType) => {
    if (!params.formData && !params.body) {
      console.log(ERROR_MESSSAGE.HD0004);
    }

    return BaseRequest({
      method: MethodEnum.POST,
      path: params.path,
      data: params.body,
      formData: params.formData,
    });
  };

  const get = (params: GetMethodType) => {
    let requestPath = params.path;

    if (params.param) {
      requestPath = `${requestPath}/${params.param}`;
    }
    if (params.query) {
      requestPath = `${requestPath}?${params.query
        .map(({ key, value }: QueryType) => {
          return `${key}=${value}`;
        })
        .join('&')}`;
    }

    return BaseRequest({ method: MethodEnum.GET, path: requestPath });
  };

  const put = (params: PutMethodType) => {
    return BaseRequest({ method: MethodEnum.PUT, path: params.path });
  };

  const del = (params: DeleteMethodType) => {
    return BaseRequest({ method: MethodEnum.DELETE, path: params.path });
  };

  const BaseRequest = async ({
    method,
    path,
    data,
    formData,
    ...options
  }: RequestOption) => {
    try {
      const req = await fetch(`${REQUEST_HOST}/${path}`, {
        ...options,
        method: method,
        credentials: 'include',
        headers: {
          ...options.headers,
          ...(options.credentials
            ? { Authorization: `Bearer ${GetToken()}` }
            : {}),
        },
        ...(method !== 'GET'
          ? { body: formData ? formData : JSON.stringify(data) }
          : {}),
      });

      const dataRes: ResponseRequest = await req.json();

      if (!req.ok) {
        if (dataRes.code === ErrorCodeEnum.TOKEN_REQUIRED) {
          await RefreshToken();
          await BaseRequest({ method, path, data, formData, ...options });
        }
        console.log(ERROR_MESSSAGE[dataRes.code]);
      }

      return dataRes;
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong!',
        description: 'There was a problem with your request.',
      });
    }
  };

  const RefreshToken = async () => {
    const res = await BaseRequest({
      path: REQUEST_PATH.auth.refresh(),
      method: MethodEnum.GET,
    });

    return res;
  };

  return { post, put, del, get };
}
