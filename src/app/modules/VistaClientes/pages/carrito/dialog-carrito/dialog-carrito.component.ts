import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AceptarCancelarDialogComponent } from 'src/app/components/aceptar-cancelar-dialog/aceptar-cancelar-dialog.component';
import { objCarritoYProcesoDeCompra } from 'src/app/interfaces/DTOsCarritoYProcesoDeCompra/DTOCarritoYProcesoDeCompra.interface';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dialog-carrito',
  templateUrl: './dialog-carrito.component.html',
  styleUrls: ['./dialog-carrito.component.css']
})
export class DialogCarritoComponent implements OnInit {
  productosDelCarrito: objCarritoYProcesoDeCompra[] = [];
  total: number = 0;


  private cantidadSubject = new Subject<number>();
  cantidad$ = this.cantidadSubject.asObservable();
  public cantidad: number = 1;


  constructor(
    private sharedServ: SharedService,
    public dialogRef: MatDialogRef<DialogCarritoComponent>,
    private funcionesGlobalesService: FuncionesGlobalesService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.cargarProductosDeLocalStorage()
  }
  ngOnInit(): void {
    this.contarTotal();
    this.cantidad$.subscribe(value => {
      this.validarNumero(value);
    });
  }
  validarNumero(value: number): void {
    if (value == null) {
      this.cantidad = 1;
    } else if (value < 1) {
      this.cantidad = 1;
    } else if (value > 20) {
      this.cantidad = 20;
    }
  }
  cargaSrc(producto: objCarritoYProcesoDeCompra) {
    return this.funcionesGlobalesService.cargarSrcCompras(producto);
  }
  private cargarProductosDeLocalStorage() {
    this.productosDelCarrito = this.sharedServ.obtenerCarrito();
  }

  contarTotal() {
    this.total = 0;
    this.productosDelCarrito.forEach(producto => {
      this.total += (producto.precio * producto.cantidad);
    });

  }

  onChange() {
    //Borrar local storage
    this.sharedServ.vaciarCarrito();
    //Cargar nuevos productos
    this.productosDelCarrito.forEach(productoAdd => {
      if (productoAdd.cantidad <= 0) { productoAdd.cantidad = 1; }
      this.sharedServ.agregarProducto(productoAdd);
    });
    //Cargar nueva Lista al local Storage
    this.cargarProductosDeLocalStorage();
    //Contar nuevamente el total
    this.contarTotal();
  }

  vaciarCarrito() {
    this.sharedServ.vaciarCarrito();
    this.cargarProductosDeLocalStorage();
    this.total = 0;
  }
  private sacarProductoDeCarrito(prod: objCarritoYProcesoDeCompra) {
    this.sharedServ.quitarProductoDeCarrito(prod);
    this.cargarProductosDeLocalStorage();
    this.contarTotal();
  }
  openDialogCancelar(obj: objCarritoYProcesoDeCompra) {

    const dialogRef = this.dialog.open(AceptarCancelarDialogComponent, {
      width: '300px',
      data: { message: `¿Desea eliminar ${obj.nombreProducto}?` },
      disableClose: true  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sacarProductoDeCarrito(obj);
      }
    });
  }

  navegarAfinalizarCompra() {
    this.router.navigate(['store/pagos']);
    this.dialogRef.close();
  }
}
