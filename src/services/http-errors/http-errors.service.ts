import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorsService {
  constructor() {}

  handleSignupError(err: HttpErrorResponse): string {
    if (err.status === 400 && err.error == 'error body') {
      return 'There is an error on filling the form, please try again';
    }
    return 'Server error. Please reload and try again';
  }

  handleLoginError(err: HttpErrorResponse): string {
    if (err.status === 400 && err.error == 'Invalid user')
      return 'The username or the email are wrong. Try again';
    if (err.status === 400 && err.error == 'Invalid password')
      return 'The password is wrong. Try again';
    return 'Server error. Please reload and try again';
  }
}
