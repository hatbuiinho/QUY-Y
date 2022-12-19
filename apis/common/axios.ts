import { getExceptionPayload } from './utils';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
// import store from '~/store';

// const { dispatch } = store;

export const onFullfilledRequest = (response: AxiosResponse) => response;
export const onRejectedResponse = (error: any): any => {
  if (error instanceof AxiosError) {
    return Promise.reject(getExceptionPayload(error.response?.data));
  }
  return Promise.reject(getExceptionPayload(error));
};

const publicRequest = axios.create({
  baseURL: `${process.env.TTPQ_BASE_URL}`,
});

publicRequest.interceptors.response.use(onFullfilledRequest, onRejectedResponse);

publicRequest.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  // Do something before request is sent
  if (config && config.headers && sessionStorage.getItem('userToken'))
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('userToken')}`;
  return config;
}, (error: AxiosError): Promise<AxiosError> => {
  // Do something with request error
  return Promise.reject(error);
});

export default publicRequest;
