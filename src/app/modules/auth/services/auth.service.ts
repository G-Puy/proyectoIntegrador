import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { DTOUsuario, DTOUsuarioLogin } from 'src/app/interfaces/usuario.interfce';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:7202/';
  // apiUrl = 'https://quediosa.azurewebsites.net/';


  private usuarioLogin: DTOUsuarioLogin | null = null;
  private usuarioLogeado: DTOUsuario | null = null;
  error: string = '';
  constructor(private http: HttpClient) {

  }
  get currentUser(): DTOUsuario | null {
    if (!this.usuarioLogeado) return null;
    return structuredClone(this.usuarioLogeado);//Puede llegar a no funcionar por compatibilidad
  }

  login(NombreDeUsuario: string, Contrasenia: string): Observable<DTOUsuario> {
    const body = this.usuarioLogin;
    return this.http.post<DTOUsuario>(`${this.apiUrl}api/Usuario/login`, { NombreDeUsuario, Contrasenia })
      .pipe(
        tap(resp => this.usuarioLogeado = resp), //si viene null viene null (?)
        tap(user => {
          if (user != null) {
            localStorage.setItem('token', user.contrasenia.toString());
            localStorage.setItem('username', user.nombreDeUsuario.toString());
            localStorage.setItem('tipoUsuario', user.tipoUsuario.toString());
            localStorage.setItem('idUsuario', user.idUsuario.toString());
          }
        })

      )
  }

  logOut() {
    this.usuarioLogin = null;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    const nombreDeUsuario = localStorage.getItem('username');
    return this.http.get<DTOUsuario>(`${this.apiUrl}api/Usuario/confirmarToken?token=${token}&nombreDeUsuario=${nombreDeUsuario}`)
      .pipe(
        tap(user => this.usuarioLogeado = user),
        map(user => !!user),
        catchError(err => of(false))
      );
  }
}
