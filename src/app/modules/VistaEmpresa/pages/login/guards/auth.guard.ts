import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user.interfce';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanMatch, CanActivate {
    constructor(private http: HttpClient) { }
    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
        console.log('CanMatch');
        console.log({ route, segments });
        // throw new Error('Method not implemented.');

        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('CanActivate');
        console.log(route, state);
        // throw new Error('Method not implemented.');
        return false;

    }

}
