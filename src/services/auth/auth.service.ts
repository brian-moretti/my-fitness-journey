import { Injectable } from '@angular/core';
import { IUser } from '../../core/model/interface/user';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;

  constructor(private loginService: LoginService) {
    this.isLogged = !!localStorage.getItem('Account');
  }

  isAuth() {
    this.isJWTActive();
    const account = JSON.parse(localStorage.getItem('Account')!);
    return !!account && this.isLogged;
  }

  isJWTActive() {
    this.loginService.loginVerifyUsingGet().subscribe((jwtVerify) => {
      this.isLogged = jwtVerify.valid;
      if (!this.isLogged) {
        this.isLogoutStorage();
      }
    });
  }

  isLoginStorage(account: IUser) {
    localStorage.setItem('Account', JSON.stringify(account));
    this.isLogged = true;
  }

  isLogoutStorage() {
    localStorage.removeItem('Account');
    this.isLogged = false;
  }
}
