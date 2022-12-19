import { UnhandledError } from './constant';
import { APIError } from './type';
import { InternalError } from './constant';

export const getExceptionPayload = (ex: unknown): APIError => {
  if (typeof ex !== 'object' || !ex) {
    return UnhandledError;
  }

  const typedException = ex as APIError;
  const matchErrorStructure =
    Object.prototype.hasOwnProperty.call(ex, 'message') &&
    Object.prototype.hasOwnProperty.call(ex, 'code');

  if (matchErrorStructure) {
    return typedException;
  }
  return InternalError;
};
