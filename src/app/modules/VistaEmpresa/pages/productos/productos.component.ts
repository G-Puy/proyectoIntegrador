import { Component } from '@angular/core';
import { AgregarModificarProductoComponent } from './agregar-modificar-producto/agregar-modificar-producto.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {


  constructor(public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.openDialogCancelar();

  }
  openDialogCancelar() {

    const dialogRef = this.dialog.open(AgregarModificarProductoComponent, {
      width: '300px',
      data: { message: `¿Desea eliminar ` },
      disableClose: true  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }
}
