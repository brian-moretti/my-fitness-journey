import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../core/model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/login';

  loginUserUsingPost(userInfo: IUser): Observable<IUser[]> {
    return this.http.post<IUser[]>(this.url, userInfo, {
      withCredentials: true,
    });
  }

  logoutUserUsingDelete() {
    return this.http.delete(this.url);
  }
}
