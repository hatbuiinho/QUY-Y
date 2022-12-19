import { Middleware } from 'redux';

export const statusMiddleware: Middleware = (_) => (next) => (action) => {
  next(action);
};
