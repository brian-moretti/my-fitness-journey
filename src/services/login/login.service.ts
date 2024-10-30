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

  loginVerifyUsingGet(): Observable<{ valid: boolean; user: IUser }> {
    return this.http.get<{ valid: boolean; user: IUser }>(this.url, {
      withCredentials: true,
    });
  }

  loginUserUsingPost(userInfo: IUser): Observable<IUser[]> {
    return this.http.post<IUser[]>(this.url, userInfo, {
      withCredentials: true,
    });
  }

  //! CAPOCCIO' - CANCELLA IL LOCAL STORAGE E TOGLI IL REDIRECT USER NEL BE - METTILO IN FE
  logoutUserUsingDelete() {
    return this.http.delete(this.url, { withCredentials: true });
  }
}
