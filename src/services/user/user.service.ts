import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserDetails } from '../../core/model/interface/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private url = `${environment.apiUrl}/users'`;

  getAllUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url, { withCredentials: true });
  }

  getUser(userId: number): Observable<IUserDetails> {
    return this.http.get<IUserDetails>(`${this.url}/${userId}`, {
      withCredentials: true,
    });
  }

  createUserUsingPost(userInfo: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.url, userInfo);
  }

  modifyUserUsingPut(userInfo: IUser): Observable<IUser> {
    return this.http.put(`${this.url}/${userInfo.id}`, userInfo, {
      withCredentials: true,
    });
  }

  deleteUserUsingDelete(userInfo: IUser): Observable<IUser> {
    return this.http.delete(`${this.url}/${userInfo.id}`, {
      withCredentials: true,
    });
  }
}
