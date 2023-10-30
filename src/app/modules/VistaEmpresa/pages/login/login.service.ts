import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user.interfce';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseURL = '';
  private user?: User;
  constructor(private http: HttpClient) {
  }
  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);//Puede llegar a no funcionar por compatibilidad
  }

  login(usuario: string, password: string): Observable<User> {
    //http.post('login',{usuario, password});
    return this.http.get<User>(`${this.baseURL}/users/1`)
      .pipe(
        tap(resp => this.user = resp),
        tap(user => localStorage.setItem('token', user.id.toString()))
      )
  }
}
