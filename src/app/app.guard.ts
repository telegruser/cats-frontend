import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
 

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
    constructor(private router: Router, private appservice: AppService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
        console.debug('проверка наличия токена..')
        if (this.appservice.isAuthorized) return true;
        // const currentUser = this.authenticationService.currentUserValue;
        // if (currentUser) {
        //     // logged in so return true
        //     return true;        

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}