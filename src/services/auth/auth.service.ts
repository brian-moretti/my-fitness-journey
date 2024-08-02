import { Injectable } from '@angular/core';
import { IUserGet } from '../../core/model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;
  //! USARE GETUSER/ID PER PRENDERE ACCOUNT

  constructor() {
    this.isLogged = !!localStorage.getItem('Account');
  }

  isAuth() {
    const account = JSON.parse(localStorage.getItem('Account')!);
    return !!account && this.isLogged;
  }

  isLoginStorage(account: IUserGet) {
    localStorage.setItem('Account', JSON.stringify(account));
    this.isLogged = true;
  }

  isLogoutStorage() {
    localStorage.removeItem('Account');
    this.isLogged = false;
  }
}
