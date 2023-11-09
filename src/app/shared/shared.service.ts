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

  //#region  TIPO PRENDA

  getAllTipoPrendas(): Observable<DTOGenAbms[]> {
    return this.http.get<DTOGenAbms>(`${this.apiUrl}api/TipoPrendas/TraerTiposPrenda`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  altaTipoPrenda(dtoTp: DTOGenAbms): Observable<boolean> {
    return this.http.post<DTOGenAbms>(`${this.apiUrl}api/TipoPrendas/altaTipoPrenda`, dtoTp)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  editarTipoPrenda(dtoTp: DTOGenAbms): Observable<boolean> {
    return this.http.put<DTOGenAbms>(`${this.apiUrl}api/TipoPrendas/editarTipoPrenda`, dtoTp)
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


  //#endregion TIPO PRENDA

  //#region  COLORES

  getAllColores(): Observable<DTOGenAbms[]> {
    return this.http.get<DTOGenAbms>(`${this.apiUrl}api/Color/TraerColores`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  altaColor(dtoTp: DTOGenAbms): Observable<boolean> {
    return this.http.post<DTOGenAbms>(`${this.apiUrl}api/Color/alta`, dtoTp)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  editarColor(dtoTp: DTOGenAbms): Observable<boolean> {
    return this.http.put<DTOGenAbms>(`${this.apiUrl}api/Color/editarColor`, dtoTp)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  eliminarColor(idEliminar: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}api/Color/eliminar?idColor=${idEliminar}`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  //#endregion COLORES

  //#region TALLES

  getAllTalles(): Observable<DTOGenAbms[]> {
    return this.http.get<DTOGenAbms>(`${this.apiUrl}api/Talle/TraerTalles`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  altaTalle(dtoTp: DTOGenAbms): Observable<boolean> {
    return this.http.post<DTOGenAbms>(`${this.apiUrl}api/Talle/alta`, dtoTp)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  editarTalle(dtoTp: DTOGenAbms): Observable<boolean> {
    return this.http.put<DTOGenAbms>(`${this.apiUrl}api/Talle/editar`, dtoTp)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  eliminarTalle(idEliminar: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}api/Talle/eliminarTalle?idTalle=${idEliminar}`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  //#endregion TALLES
}


