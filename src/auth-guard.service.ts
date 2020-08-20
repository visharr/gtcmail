import { CanActivate, ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

import { LoginService } from "./app/login.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService:LoginService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loginService.isLoggedIn().then(
            (authenticated: boolean) => {
                if (authenticated) {
                    return true;
                }
                else {
                    this.router.navigate(['']);
                }
            }
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return this.canActivate(route,state);
    }



}