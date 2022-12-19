import { APIError } from './type';

export const InternalError: APIError = {
  message: 'Internal error during request.',
  code: 500,
};
export const UnhandledError: APIError = {
  message: 'Cannot handle error data.',
  code: 400,
};
