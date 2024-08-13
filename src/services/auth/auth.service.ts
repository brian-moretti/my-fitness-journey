import { Injectable } from '@angular/core';
import { IUser } from '../../core/model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;
  //! USARE GETUSER/ID PER PRENDERE ACCOUNT

  constructor() {
    //! OCCHIO CHE QUANDO IL JWT EXPIRE - LOCALSTORAGE è ancora presente e da ancora come loggato
    this.isLogged = !!localStorage.getItem('Account');
  }

  isAuth() {
    const account = JSON.parse(localStorage.getItem('Account')!);
    return !!account && this.isLogged;
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
