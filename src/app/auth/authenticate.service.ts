import { Injectable } from '@angular/core';
import { Observable } from'rxjs/Observable';
import { HttpClient, HttpHeaders } from'@angular/common/http';

import { UserLogin } from './user-login';
import { UserRegister } from './user-register';


@Injectable()
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  //sends login info the backend and returns JSON web token if successful
  login(loginInfo: UserLogin) {
    return this.http.post<any>('http://45.55.196.206:3000/auth/login', loginInfo)
    .do(res => this.setSession(res))
    .shareReplay();
  }

  //stores the web token in local storage
  private setSession(authResult) {
    console.log(authResult.token);
    localStorage.setItem('id_token', authResult.token);
  }          

  //removes the webtoken from local storage
  logout() {
      localStorage.removeItem("id_token");
  }

  //sends registration info to backend server
  register(registerInfo: UserRegister) {
    return this.http.post<any>('http://45.55.196.206:3000/auth/register', registerInfo)
    .map(res => res);
  }

  //sends web token to backend server to check if still valid
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

  //sends web token to backend server to retrieve the user id
  getUser(){
    console.log(localStorage.getItem("id_token"));
    return this.http.post<any>('http://45.55.196.206:3000/auth/verify', {'token': localStorage.getItem("id_token")})
    .map(res => {
      return res
    });
  }
}
