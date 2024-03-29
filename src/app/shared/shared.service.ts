import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { DTOTipoPrenda } from '../interfaces/tipoProducto.interface';
import { DTOGenAbms } from '../interfaces/objGenericoParaABMS.interface';
import { DTOProductoEnvio } from '../interfaces/DTOsEnvio/productoEnvioDTO.interface';
import { recibirProductoDTOBack } from '../interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { DTOStockEnvio } from '../interfaces/DTOsEnvio/stockEnvioDTO.interface';
import { DTODataTodosLosProductos } from '../interfaces/DTODataTodosLosProductos.interface';
import { Router } from '@angular/router';
import { objCarritoYProcesoDeCompra } from '../interfaces/DTOsCarritoYProcesoDeCompra/DTOCarritoYProcesoDeCompra.interface';
import { objOrderData } from '../interfaces/DTOsCarritoYProcesoDeCompra/DTOOrderData.interface';
import { DTOPreferencia } from '../interfaces/DTOPreferencia.interface';
import { DTOAlertaStock } from '../interfaces/Alertas/Stock/DTOAlertaStock.interface';
import { DTOAlertaPedido } from '../interfaces/Alertas/Ventas/DTOAlertaPedido.interface';
import { DTOFiltroAlertasPedidos } from '../interfaces/Alertas/Ventas/DTOFiltroAlertasPedidos.interface';
import { DTODetallePedido } from '../interfaces/Alertas/Ventas/DTODetallePedido.interface';
import { DTOUsuario } from '../interfaces/usuario.interfce';
import { DTOCambioPass } from '../interfaces/DTOCambioPass.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  todosLosProductos: recibirProductoDTOBack[] = [];
  objParaTodosLosProductos: DTODataTodosLosProductos | undefined;
  // apiUrl = 'https://localhost:7202/';
  apiUrl = 'https://quediosa.azurewebsites.net/';
  constructor(
    private http: HttpClient,
    private router: Router) {
  }


  //#region
  public cargarTodasLosProductos(origen: string = '') {
    this.todosLosProductos = [];
    this.traerTodosLosProductos().subscribe(data => {
      if (data) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (origen == "homeProductos" && element.visibleEnWeb == true) {
            this.todosLosProductos.push(element);
          } else if (origen == '') {
            this.todosLosProductos.push(element);
          }
        }
      }
    }, error => {
      console.error('Error al cargar la imagen:', error);
    });
  }

  public obtenerProductosCargados(): recibirProductoDTOBack[] {
    return this.todosLosProductos;
  }


  public cargarDatosParaTodosLosProductos(categoria: string, tipoAccion: string) {
    this.objParaTodosLosProductos = {
      tipoDeFiltro: tipoAccion,
      tipoProductoBuscado: categoria
    }
    this.router.navigate(['store/productos']);
  }

  public obtenerDatosParaTodosLosProductos(): DTODataTodosLosProductos {
    return this.objParaTodosLosProductos!;
  }

  //#endregion




  //#region  TIPO PRENDA

  getAllTipoPrendas(): Observable<DTOGenAbms[]> {
    return this.http.get<DTOGenAbms>(`${this.apiUrl}api/TipoPrendas/traerTodos`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  altaTipoPrenda(dtoTp: DTOGenAbms): Observable<any> {
    return this.http.post<DTOGenAbms>(`${this.apiUrl}api/TipoPrendas/alta`, dtoTp);
    /*   .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      ) */
  }

  editarTipoPrenda(dtoTp: DTOGenAbms): Observable<any> {
    return this.http.put<DTOGenAbms>(`${this.apiUrl}api/TipoPrendas/modificar`, dtoTp);
    /*  .pipe(
       tap(resp => of(resp)),
       catchError(err => of(err))
     ) */
  }


  eliminarTipoPrenda(idEliminar: number): Observable<any> {
    return this.http.delete<boolean>(`${this.apiUrl}api/TipoPrendas/eliminar?idTipoPrenda=${idEliminar}`)
    /*   .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      ) */
  }


  //#endregion TIPO PRENDA

  //#region  COLORES

  getAllColores(): Observable<DTOGenAbms[]> {
    return this.http.get<DTOGenAbms>(`${this.apiUrl}api/Color/TraerTodos`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  altaColor(dtoTp: DTOGenAbms): Observable<any> {
    return this.http.post<DTOGenAbms>(`${this.apiUrl}api/Color/alta`, dtoTp);
    /*   .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      ) */
  }

  editarColor(dtoTp: DTOGenAbms): Observable<any> {
    return this.http.put<DTOGenAbms>(`${this.apiUrl}api/Color/modificar`, dtoTp)
    /* .pipe(
      tap(resp => of(resp)),
      catchError(err => of(err))
    ) */
  }

  eliminarColor(idEliminar: number): Observable<any> {
    return this.http.delete<boolean>(`${this.apiUrl}api/Color/eliminar?idColor=${idEliminar}`);
    /*    .pipe(
         tap(resp => of(resp)),
         catchError(err => of(err))
       ) */
  }

  //#endregion COLORES

  //#region TALLES

  getAllTalles(): Observable<DTOGenAbms[]> {
    return this.http.get<DTOGenAbms>(`${this.apiUrl}api/Talle/TraerTodos`)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  altaTalle(dtoTp: DTOGenAbms): Observable<any> {
    return this.http.post<DTOGenAbms>(`${this.apiUrl}api/Talle/alta`, dtoTp)
    /*   .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      ) */
  }

  editarTalle(dtoTp: DTOGenAbms): Observable<any> {
    return this.http.put<DTOGenAbms>(`${this.apiUrl}api/Talle/modificar`, dtoTp);
    /*   .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      ) */
  }

  eliminarTalle(idEliminar: number): Observable<any> {
    return this.http.delete<boolean>(`${this.apiUrl}api/Talle/eliminar?idTalle=${idEliminar}`);
    /*  .pipe(
       tap(resp => of(resp)),
       catchError(err => of(err))
     ) */
  }

  //#endregion TALLES

  //#region  PRODUCTO

  altaProducto(dataEnvio: FormData): Observable<boolean> {
    return this.http.post<DTOGenAbms>(`${this.apiUrl}api/Producto/alta`, dataEnvio)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }

  traerTodosLosProductos(): Observable<recibirProductoDTOBack[]> {
    return this.http.get<recibirProductoDTOBack[]>(`${this.apiUrl}api/Producto/TraerTodos`);
  }

  cargarTodosLosProductos(): Observable<recibirProductoDTOBack[]> {
    return this.http.get<recibirProductoDTOBack[]>(`${this.apiUrl}api/Producto/TraerTodos`);
  }


  eliminarProducto(idEliminar: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}api/Producto/eliminar?id=${idEliminar}`)

  }

  modificarProducto(dataEnvio: FormData): Observable<any> {
    return this.http.put<DTOGenAbms>(`${this.apiUrl}api/Producto/modificar`, dataEnvio)
    /*  .pipe(
       tap(resp => of(resp)),
       catchError(err => of(err))
     ) */
  }
  //#endregion PRODUCTO



  //#region  STOCK

  editarStock(dtoStock: DTOStockEnvio): Observable<boolean> {
    return this.http.put<DTOGenAbms>(`${this.apiUrl}api/Stock/modificar`, dtoStock)
      .pipe(
        tap(resp => of(resp)),
        catchError(err => of(err))
      )
  }
  //#endregion STOCK


  //#region  PRODUCTOS EN CARRITO
  private storageKey = 'carrito';
  agregarProducto(producto: objCarritoYProcesoDeCompra) {
    let carrito: objCarritoYProcesoDeCompra[] = this.obtenerCarrito();
    carrito.push(producto);
    localStorage.setItem(this.storageKey, JSON.stringify(carrito));
  }

  obtenerCarrito(): objCarritoYProcesoDeCompra[] {
    const carrito = localStorage.getItem(this.storageKey);
    return carrito ? JSON.parse(carrito) : [];
  }

  /* //!ACA ESTA EL PROBLEMA */
  quitarProductoDeCarrito(productoEliminar: objCarritoYProcesoDeCompra) {
    console.log(productoEliminar);
    let carrito: objCarritoYProcesoDeCompra[] = this.obtenerCarrito();
    console.log(carrito);

    carrito = carrito.filter(producto =>
      !(producto.idProducto === productoEliminar.idProducto
        && producto.color.id === productoEliminar.color.id
        && producto.talle.id === productoEliminar.talle.id));
    localStorage.setItem(this.storageKey, JSON.stringify(carrito));
  }
  existeProductoEnCarrito(productoAdd: objCarritoYProcesoDeCompra): boolean {
    let existeProducto = false;
    let carrito: objCarritoYProcesoDeCompra[] = this.obtenerCarrito();
    carrito.forEach(producto => {
      if (producto.idProducto == productoAdd.idProducto && producto.color.id == productoAdd.color.id && producto.talle.id == productoAdd.talle.id) {
        existeProducto = true;
      }
    });
    return existeProducto;
  }

  vaciarCarrito() {
    localStorage.setItem(this.storageKey, JSON.stringify([]));
  }


  //#endregion

  //#region PAGOS

  createPaymentPreference(orderList: objOrderData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/MercadoPago/crearPreferencia`, orderList, {
      responseType: 'text' as 'json' // Cast 'text' to the expected type 'json'
    });
  }
  createPaymentPreference2(orderList: objOrderData): Observable<DTOPreferencia> {
    return this.http.post<DTOPreferencia>(`${this.apiUrl}api/MercadoPago/crearPreferencia`, orderList)
  }


  //#region  VENTA

  guardarIdVenta(idVenta: number): void {
    localStorage.setItem('idVenta', idVenta.toString());
  }
  //*Validar del otro lado, convertirlo en number
  obtenerIdVenta(): string {
    const idVenta = localStorage.getItem('idVenta');
    return idVenta ? idVenta : "";
  }

  eliminarIdVenta(): void {
    localStorage.removeItem('idVenta');
  }

  confirmarCompra(idVenta: number): Observable<any> {
    return this.http.get<DTOPreferencia>(`${this.apiUrl}api/MercadoPago/confirmarCompra?idVenta=${idVenta}`)
  }
  cancelarCompra(idVenta: number): Observable<any> {
    return this.http.get<DTOPreferencia>(`${this.apiUrl}api/MercadoPago/cancelarCompra?idVenta=${idVenta}`)
  }
  //#endregion VENTA

  //#endregion PAGOS



  //#region  Perfil colaborador
  obtenerUsernameLogeado(): string {
    const username = localStorage.getItem('username');
    return username ? username : "";
  }
  //#endregion



  //#region  Alertas stock
  traerAlertasStock(): Observable<DTOAlertaStock[]> {
    return this.http.get<DTOAlertaStock[]>(`${this.apiUrl}api/AlertaStock/TraerTodos`)
  }


  leerAlertaStock(idAlerta: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}api/AlertaStock/Leida?idAlerta=${idAlerta}`)
  }


  traerCantidadAlertasStock(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}api/AlertaStock/Contar`)
  }
  //#endregion Alertas stock

  //#region Alertas pedidos
  traerAlertasPedidosFiltradas(filtro: DTOFiltroAlertasPedidos): Observable<DTOAlertaPedido[]> {
    return this.http.post<DTOAlertaPedido[]>(`${this.apiUrl}api/AlertaPedido/TraerFiltrados`, filtro)
  }

  confirmarAlertasPedidosFiltradas(idAlerta: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}api/AlertaPedido/Realizado?idAlerta=${idAlerta}`)
  }


  traerDetalleVentaAlertasPedidosFiltradas(idVenta: number): Observable<DTODetallePedido[]> {
    return this.http.get<DTODetallePedido[]>(`${this.apiUrl}api/Venta/TraerDetallePedido?idVenta=${idVenta}`)
  }


  traerCantidadPedidosPendientes(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}api/AlertaPedido/Contar`)
  }
  //#endregion Alertas pedidos



  //#region COLABORADORES
  traerTodosLosColaboradores(): Observable<DTOUsuario[]> {
    return this.http.get<DTOUsuario[]>(`${this.apiUrl}api/Usuario/traerTodos`)
  }



  eliminarColaborador(idColaborador: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}api/Usuario/eliminar?id=${idColaborador}`)
  }


  altaColaborador(nuevoUsuario: DTOUsuario): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}api/Usuario/alta`, nuevoUsuario)
  }
  modificarColaborador(modificarUsuario: DTOUsuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/Usuario/modificar`, modificarUsuario)
  }


  //#endregion COLABORADORES

  //#region  PERFIL PERSONA
  modificarMiPass(modificarUsuario: DTOCambioPass): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}api/Usuario/modificarPass`, modificarUsuario)
  }

  cargarColaboradorPorId(idColaborador: number): Observable<DTOUsuario> {
    return this.http.get<DTOUsuario>(`${this.apiUrl}api/Usuario/buscarPorId?id=${idColaborador}`)
  }
  //#endregion PERFIL PERSONA

}


