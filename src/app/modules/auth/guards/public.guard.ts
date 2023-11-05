import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DTOUsuario } from 'src/app/interfaces/usuario.interfce';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PublicGuard implements CanMatch, CanActivate {

    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router,) { }

    private checkAuthStatus(): boolean | Observable<boolean> {
        return this.auth.checkAuthentication()
            .pipe(
                tap(estaAutenticado => {
                    if (estaAutenticado) {
                        this.router.navigate(['./']);
                    }
                }),
                map(esAutenticado => !esAutenticado)
            )
    }

    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
        return this.checkAuthStatus();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkAuthStatus();
    }

}
