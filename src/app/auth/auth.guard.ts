import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// import authorization service
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthenticateService
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // handle any redirects if a user isn't authenticated
      if (!this.auth.isLoggedIn()) {
        // redirect the user
        this.router.navigate(['/login']);
        return false;
      }
      
      return true;
  }
}
