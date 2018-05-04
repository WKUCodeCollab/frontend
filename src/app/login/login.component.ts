import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, EmailValidator } from '@angular/forms';
import { AuthenticateService } from '../auth/authenticate.service';

import { UserLogin } from '../auth/user-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isValidFormSubmitted = false;
  validateEmail = true;
  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  user = new UserLogin();
  
  constructor(private router: Router, private authService:AuthenticateService) {
  }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    //checks if the form is filled out
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      this.user = new UserLogin();	 
      form.resetForm();
       return;
    }
    this.isValidFormSubmitted = true;
    this.user = form.value;
    console.log("Email: " + this.user.email);
    console.log("Password: " + this.user.password);

    //sends the authetication service the user information to login
    this.authService.login(this.user).subscribe(
      loggedIn => {
        console.log(loggedIn);
        this.router.navigate(['/home']);
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
 }



}
