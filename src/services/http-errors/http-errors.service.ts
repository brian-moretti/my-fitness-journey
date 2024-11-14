import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorsService {
  constructor() {}

  handleSignupError(err: HttpErrorResponse): string {
    if (err.status === 400 && err.error == 'Error Body')
      return 'There is an error on filling the form, please try again';
    if (err.status === 400 && err.error == 'Duplicate Name')
      return "This username already exists. Can't create a new account";
    if (err.status === 400 && err.error == 'Duplicate Email')
      return "This email already exists. Can't create a new account";
    return 'Server error. Please reload and try again';
  }

  handleLoginError(err: HttpErrorResponse): string {
    if (err.status === 400 && err.error == 'Invalid user')
      return 'The username or the email are wrong. Try again';
    if (err.status === 400 && err.error == 'Invalid password')
      return 'The password is wrong. Try again';
    return 'Server error. Please reload and try again';
  }

  handleUserError(err: HttpErrorResponse) {
    if (err.status === 400 && err.error == 'Duplicate Name')
      return "This username already exists. Can't update the account";
    if (err.status === 400 && err.error == 'Duplicate Email')
      return "This email already exists. Can't update the account";
    if (err.status === 404) return err.error;
    return 'Server error. Please reload and try again';
  }

  handleExerciseError(err: HttpErrorResponse) {
    if (err.status === 404) return err.error;
    if (err.status === 400 && err.error == 'Duplicate Exercise')
      return err.error;
    return 'Server error. Please reload and try again';
  }

  handleTrainingProgramError(err: HttpErrorResponse) {
    if (err.status === 400) return err.error;
    if (err.status === 404) return err.error;
    return 'Server error. Please reload and try again';
  }

  handleExerciseTrainingError(err: HttpErrorResponse) {
    if (err.status !== 500) return err.error;
    return 'Server error. Please reload and try again';
  }
}
