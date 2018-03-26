// use this service to hook up to the backend for user login and registration
// get data from forms and send to express api
import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticateService {

  //private API = 'path/to/api'; 

  constructor(
    //private http: HttpClient
  ) { }

  login(email: string, password: string) {
    //call API function 
  }
  
  get isLoggedIn() {
    return true;
  }
}
