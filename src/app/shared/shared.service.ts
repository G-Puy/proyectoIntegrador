import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { DTOTipoPrenda } from '../interfaces/tipoProducto.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  apiUrl = 'https://localhost:7202/';
  constructor(private http: HttpClient) {

  }
  altaTipoPrenda(dtoTp: DTOTipoPrenda): Observable<boolean> {
    return this.http.post<DTOTipoPrenda>(`${this.apiUrl}api/TipoPrendas/altaTipoPrenda`, dtoTp)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }
}


