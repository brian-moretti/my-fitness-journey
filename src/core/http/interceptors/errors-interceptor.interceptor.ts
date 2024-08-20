import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

//! ADIBITO ALLA VERIFICA DELLO STATO DI LOGIN SESSIONE

export const errorsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      logInterceptor(err, router, auth);
      return throwError(() => err);
    })
  );
};

function logInterceptor(
  err: HttpErrorResponse,
  router: Router,
  auth: AuthService
) {
  if (err.status === 401 || err.status === 403) {
    //? SEND MESSAGE TOAST - SESSION IS EXPIRED
    auth.isLogoutStorage();
    router.navigate(['']);
  }
}
