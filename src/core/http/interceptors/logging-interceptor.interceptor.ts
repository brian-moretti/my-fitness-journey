import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req, next);

  return next(req);
};
