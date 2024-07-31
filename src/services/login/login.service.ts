import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserGet } from '../../core/model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/login';

  loginUserUsingPost(userInfo: {
    username: string;
    email: string;
    password: string;
  }): Observable<IUserGet[]> {
    return this.http.post<IUserGet[]>(this.url, userInfo, {
      withCredentials: true,
    });
  }

  logoutUserUsingDelete() {}
}
