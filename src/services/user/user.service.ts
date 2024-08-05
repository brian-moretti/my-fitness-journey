import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserCreated, IUserGet } from '../../core/model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/users';

  getUser(userId: number): Observable<IUserGet> {
    return this.http.get<IUserGet>(`${this.url}/${userId}`);
  }

  //! MODIFICARE INTERFACCIA, UNA UNICA X SERVIZIO
  createUserUsingPost(userInfo: {
    username: string;
    email: string;
    password: string;
  }): Observable<IUserCreated> {
    return this.http.post<IUserCreated>(this.url, userInfo);
  }

  modifyUserUsingPut(userInfo: IUserGet): Observable<IUserGet> {
    return this.http.put(`${this.url}/${userInfo.id}`, userInfo, {
      withCredentials: true,
    });
  }

  deleteUserUsingDelete(userInfo: IUserGet): Observable<IUserGet> {
    return this.http.delete(`${this.url}/${userInfo.id}`);
  }
}
