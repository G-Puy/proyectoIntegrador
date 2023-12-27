import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private funcionesGlobalesService: FuncionesGlobalesService
  ) {
    this.productosDelCarrito = sharedServ.obtenerCarrito();
    console.log(this.productosDelCarrito);
  }
  ngOnInit(): void {
    this.contarTotal();
  }
  cargaSrc(producto: objCarritoYProcesoDeCompra) {
    return this.funcionesGlobalesService.cargarSrcCompras(producto);
  }

  contarTotal() {
    this.total = 0;
    this.productosDelCarrito.forEach(producto => {
      this.total += producto.precio * producto.cantidad;
    });
  }
  onCantidadChange() {
    this.contarTotal();
  }

}
