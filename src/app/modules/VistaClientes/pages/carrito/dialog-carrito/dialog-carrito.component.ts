import { Component } from '@angular/core';
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
export class DialogCarritoComponent {
  productosDelCarrito: objCarritoYProcesoDeCompra[] = [];
  constructor(
    private sharedServ: SharedService,
    public dialogRef: MatDialogRef<DialogCarritoComponent>,
    private funcionesGlobalesService: FuncionesGlobalesService
  ) {
    this.productosDelCarrito = sharedServ.obtenerCarrito();
    console.log(this.productosDelCarrito);
  }

}
