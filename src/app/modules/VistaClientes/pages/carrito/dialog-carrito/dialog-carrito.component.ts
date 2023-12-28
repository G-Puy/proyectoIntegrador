import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  constructor(
    private sharedServ: SharedService,
    public dialogRef: MatDialogRef<DialogCarritoComponent>,
    private funcionesGlobalesService: FuncionesGlobalesService,
    public dialog: MatDialog,
  ) {
    this.cargarProductosDeLocalStorage()
  }
  ngOnInit(): void {
    this.contarTotal();
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
      console.log(this.total);
    });

  }

  onCantidadChange() {
    this.contarTotal();
  }

  vaciarCarrito() {
    this.sharedServ.vaciarCarrito();
    this.cargarProductosDeLocalStorage();
    this.total = 0;
  }
  private sacarProductoDeCarrito(idProducto: number) {
    this.sharedServ.quitarProductoDeCarrito(idProducto);
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
        this.sacarProductoDeCarrito(obj.idProducto);
      }
    });
  }

}
