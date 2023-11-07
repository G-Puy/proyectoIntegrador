import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { DTOTipoPrenda } from '../interfaces/tipoProducto.interface';
import { DTOGenAbms } from '../interfaces/objGenericoParaABMS.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  apiUrl = 'https://localhost:7202/';
  constructor(private http: HttpClient) {

  }

  //#region 

  altaTipoPrenda(dtoTp: DTOTipoPrenda): Observable<boolean> {
    return this.http.post<DTOTipoPrenda>(`${this.apiUrl}api/TipoPrendas/altaTipoPrenda`, dtoTp)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }


  eliminarTipoPrenda(idEliminar: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}api/TipoPrendas/eliminarTipoPrenda?idTipoPrenda=${idEliminar}`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  getAllTipoPrendas(): Observable<DTOGenAbms[]> {
    return this.http.get<DTOGenAbms>(`${this.apiUrl}api/TipoPrendas/TraerTiposPrenda`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }
  //#endregion
}


