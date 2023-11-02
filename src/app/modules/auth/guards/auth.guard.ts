import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user.interfce';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanMatch, CanActivate {

    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router,) { }

    private checkAuthStatus(): boolean | Observable<boolean> {
        return this.auth.checkAuthentication()
            .pipe(
                tap(estaAutenticado => {

                    if (!estaAutenticado) {
                        this.router.navigate(['/login']);
                    }
                })
            )
    }




    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
        console.log('CanMatch');
        console.log({ route, segments });
        // throw new Error('Method not implemented.');

        return false;
        // return this.checkAuthStatus();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('CanActivate');
        console.log(route, state);
        // throw new Error('Method not implemented.');
        return false;

        //  return this.checkAuthStatus();
    }

}
