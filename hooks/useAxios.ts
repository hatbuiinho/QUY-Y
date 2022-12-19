import { APIError } from '../apis/common/type';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import publicRequest from '../apis/common/axios';
import { getExceptionPayload } from '../apis/common/utils';

const useAxios = <Data = any>(
  axiosParams: AxiosRequestConfig,
  dependencies: any[] = [],
  hideSpinner?: boolean,
) => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<APIError>();
  const [loaded, setLoaded] = useState(false);

  const CancelToken = axios.CancelToken;
  const cancel = CancelToken.source();

  const makeRequest = async (axiosParams: AxiosRequestConfig) => {
    const { transformResponse } = axiosParams;

    try {
      const res = await publicRequest.request({
        cancelToken: cancel.token,
        ...axiosParams,
        transformResponse: [
          axios.defaults.transformResponse?.[0],
          (res) => {
            if (transformResponse) {
              // @ts-ignore
              return transformResponse(res);
            }
            return res;
          },
        ],
      });
      if(res.data) {
        setData(res.data);
      } else {
        setData(res.request.response);
      }
    } catch (err: unknown) {
      if (axios.isCancel(err)) {
        return;
      }
      setError(getExceptionPayload(err));
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    makeRequest(axiosParams);
  }, [...dependencies]);

  return { data, error, loaded, cancel };
};

export default useAxios;
