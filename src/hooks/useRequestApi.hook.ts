import { RefreshResult } from '@/common/type/result.type';
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
import userAccessToken from './useAccessToken.hook';

export default function useRequest() {
  const { toast } = useToast();
  const { GetToken, SetToken } = userAccessToken();

  function post<T extends ResponseRequest>({ token = false, ...params }: PostMethodType) {
    if (!params.formData && !params.body) {
      console.log(ERROR_MESSSAGE.HD0004);
    }

    return BaseRequest<T>(
      {
        method: MethodEnum.POST,
        path: params.path,
        data: params.body,
        formData: params.formData,
        headers: params.headers,
        token,
      },
      params.log,
    );
  }

  function get<T extends ResponseRequest>({ token = false, ...params }: GetMethodType) {
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

    return BaseRequest<T>(
      {
        method: MethodEnum.GET,
        path: requestPath,
        token,
      },
      params.log,
    );
  }

  function put<T extends ResponseRequest>({ token = false, ...params }: PutMethodType) {
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
    return BaseRequest<T>(
      {
        method: MethodEnum.PUT,
        path: requestPath,
        data: params.body,
        formData: params.formData,
        headers: params.headers,
        token,
      },
      params.log,
    );
  }

  function del<T extends ResponseRequest>({ token = false, ...params }: DeleteMethodType) {
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
    return BaseRequest<T>(
      {
        method: MethodEnum.DELETE,
        path: requestPath,
        token,
      },
      params.log,
    );
  }

  async function BaseRequest<T extends ResponseRequest>(
    { method, path, data, formData, ...options }: RequestOption,
    log = true,
  ): Promise<T | null> {
    try {
      const req = await fetch(`${REQUEST_HOST}/${path}`, {
        ...options,
        method: method,
        credentials: 'include',
        headers: {
          ...options.headers,
          ...(options.token ? { Authorization: `Bearer ${GetToken()}` } : {}),
        },
        ...(method !== 'GET' ? { body: formData ? formData : JSON.stringify(data) } : {}),
      });

      const dataRes: T = await req.json();
      if (!req.ok) {
        if (dataRes.code === ErrorCodeEnum.TOKEN_REQUIRED) {
          await RefreshToken();
          return await BaseRequest({ method, path, data, formData, ...options });
        } else {
          log &&
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong!',
              description: `${ERROR_MESSSAGE[dataRes.code]}`,
            });
          return null;
        }
      }

      return dataRes;
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong!',
        description: 'There was a problem with your request.',
      });
      return null;
    }
  }

  const RefreshToken = async () => {
    const res = await BaseRequest<RefreshResult>(
      {
        path: REQUEST_PATH.auth.refresh(),
        method: MethodEnum.POST,
      },
      false,
    );

    if (res) {
      SetToken(res.result.accessToken);
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh ph! Fail to refresh your access token',
        description: 'Fail to refresh access token.',
      });
    }

    return res;
  };

  return { post, put, del, get };
}
