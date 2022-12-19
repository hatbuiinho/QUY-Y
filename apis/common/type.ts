import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { createAsyncRequest } from '~/slices/common/action';

export enum APIStatus {
  IDLE,
  PENDING,
  REJECTED,
  FULLFILLED,
}

export type APIError = {
  message: string;
  code: number;
};

export type ReduxState<Data = any> = {
  loaded?: boolean;
  error?: APIError;
  data: Data;
};

export type ResponseData<Data = any> = {
  data: Data;
  code?: number;
  message?: string;
  success?: boolean;
};

export type SuccessPayloadAction<Response = any, Request = RequestData> = PayloadAction<
  Response,
  string,
  SuccessMeta<Request>
>;
export type ErrorPayloadAction<Request = RequestData> = PayloadAction<
  APIError | undefined, // error type
  string, // action type
  ErrorMeta<Request>,
  SerializedError
>;

export type AsyncAction<Response = ResponseData, Request = RequestData> = ReturnType<
  typeof createAsyncRequest<Request, Response>
>;

export type RequestData = { [K: string]: any } | void;
type Meta<Request> = {
  arg: Request;
  requestId: string;
};
type ErrorMeta<Request> = Meta<Request> & {
  requestStatus: 'rejected';
  aborted: boolean;
  condition: boolean;
} & {
  rejectedWithValue: boolean;
};
type SuccessMeta<Request> = Meta<Request> & { requestStatus: 'fulfilled' };
