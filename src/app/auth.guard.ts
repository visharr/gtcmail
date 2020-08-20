import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.isLoggedIn().then(
      (authenticated: boolean) => {
        if (localStorage.getItem('imslogin')) {
          return true;
        }
        else {
          this.router.navigate(['/']);
        }
      }
    );
  }  
}
