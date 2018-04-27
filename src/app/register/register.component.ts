import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, EmailValidator } from '@angular/forms';
import { AuthenticateService } from '../auth/authenticate.service';

import { UserRegister } from '../auth/user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isValidFormSubmitted = false;
  validateEmail = true;
  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  user = new UserRegister();
  
  constructor(private router: Router, private authService:AuthenticateService) {
  }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
       return;
    }
    this.isValidFormSubmitted = true;
    this.user = form.value;
    console.log("First: " + this.user.firstName);
    console.log("Last: " + this.user.lastName);
    console.log("Email: " + this.user.email);
    console.log("Password: " + this.user.password);

    this.authService.register(this.user).subscribe(
      registered => {
        //this.authService.setIsAuthenticated = registered;
        console.log(registered);
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );

    this.user = new UserRegister();	 
    form.resetForm();
    this.router.navigate(['/login']);
 }



}
