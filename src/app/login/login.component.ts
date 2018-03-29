import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: User;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Submitted");
    this.router.navigate(['/home']);
  }

}
