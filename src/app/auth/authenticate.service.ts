import { Injectable } from '@angular/core';
import { Observable } from'rxjs/Observable';
import { HttpClient, HttpHeaders } from'@angular/common/http';

import { UserLogin } from './user-login';
import { UserRegister } from './user-register';


@Injectable()
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  login(loginInfo: UserLogin) {
    return this.http.post<any>('http://45.55.196.206:3000/auth/login', loginInfo)
    .do(res => this.setSession(res))
    .shareReplay();
  }

  private setSession(authResult) {
    console.log(authResult.token);
    localStorage.setItem('id_token', authResult.token);
  }          

  logout() {
      localStorage.removeItem("id_token");
  }

  register(registerInfo: UserRegister) {
    return this.http.post<any>('http://45.55.196.206:3000/auth/register', registerInfo)
    .map(res => res);
  }

  public isLoggedIn() {
    console.log(localStorage.getItem("id_token"));
    return this.http.post<any>('http://45.55.196.206:3000/auth/verify', {'token': localStorage.getItem("id_token")})
    .map(res => {
      return res
    });
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }


  getUser(){
    console.log(localStorage.getItem("id_token"));
    return this.http.post<any>('http://45.55.196.206:3000/auth/verify', {'token': localStorage.getItem("id_token")})
    .map(res => {
      return res
    });
  }
}
