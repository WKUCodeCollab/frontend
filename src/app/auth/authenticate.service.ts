import { Injectable } from '@angular/core';
import { Observable } from'rxjs/Observable';
import { HttpClient } from'@angular/common/http';
import * as moment from "moment";

import { UserLogin } from './user-login';
import { UserRegister } from './user-register';

@Injectable()
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  login(loginInfo: UserLogin) {
    return this.http.post<any>('http://127.0.0.1:3000/users/login', loginInfo)
    .do(res => this.setSession(res))
    .shareReplay();
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');
    console.log(authResult.token);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  register(registerInfo: UserRegister) {
    return this.http.post<any>('http://127.0.0.1:3000/users/register', registerInfo)
    .map(res => res);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }

  getUser() {
    console.log(localStorage.getItem("id_token"));
    return this.http.get<any>('http://127.0.0.1:3000/users/me', { headers: {'x-access-token': localStorage.getItem("id_token")}})
    .map(res => {
      return res
    });
  }
}
