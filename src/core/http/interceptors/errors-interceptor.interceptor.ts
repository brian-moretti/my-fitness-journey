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

export const errorsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        //? SEND MESSAGE TOAST - SESSION IS EXPIRED
        router.navigate(['']);
      }
      return throwError(() => err);
    })
  );
};

function logInterceptor(err: HttpErrorResponse) {
  const router = inject(Router);
  const auth = inject(AuthService);
  if (err.status === 401) {
    //? SEND MESSAGE TOAST - SESSION IS EXPIRED
    auth.isLogoutStorage();
    router.navigate(['']);
  }
}
