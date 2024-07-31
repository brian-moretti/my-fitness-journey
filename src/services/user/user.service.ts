import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserCreated } from '../../core/model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/users';

  createUserUsingPost(userInfo: {
    username: string;
    email: string;
    password: string;
  }): Observable<IUserCreated> {
    return this.http.post<IUserCreated>(this.url, userInfo);
  }
}
