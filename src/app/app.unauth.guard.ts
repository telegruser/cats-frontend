import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnAuthGuard implements CanActivate{
    constructor(private router: Router, private appservice: AppService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
        console.debug('проверка наличия токена..')
        if (!this.appservice.isAuthorized) return true;
        this.router.navigate(['/']);
        return false;
    }
}