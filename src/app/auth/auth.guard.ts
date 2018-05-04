import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// import authorization service
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private loggedIn: boolean;

  constructor(
    private router: Router,
    private auth: AuthenticateService
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      //subscribes to the authentication service to check if the user is still logged
      this.auth.isLoggedIn().subscribe(
        data => {
          console.log("Guard: " + data.success);
          this.loggedIn = data.success;
        },
        err => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification')
      );


      // handle any redirects if a user isn't authenticated
      if (this.loggedIn == false) {
        // redirect the user
        this.router.navigate(['/login']);
        return false;
      }
      
      return true;
  }
}
