import { Injectable } from '@angular/core';
import { Observable } from'rxjs/Observable';
import { HttpClient } from'@angular/common/http';

import { UserLogin } from './user-login';
import { UserRegister } from './user-register';

@Injectable()
export class AuthenticateService {
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  login(loginInfo: UserLogin) {
    return this.http.post<any>('http://45.55.196.206:8000/user', loginInfo)
    .map(res => res);
  }

  register(registerInfo: UserLogin) {
    return this.http.post<any>('http://45.55.196.206:8000/', registerInfo)
    .map(res => res);
  }

  setIsAuthenticated(bool: boolean) {
    this.isAuthenticated = bool;
  }

  get isLoggedIn() {
    //return this.isAuthenticated;
    return true;
  }
}
