import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DTODetallePedido } from 'src/app/interfaces/Alertas/Ventas/DTODetallePedido.interface';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dialogdetalleventa',
  templateUrl: './dialogdetalleventa.component.html',
  styleUrls: ['./dialogdetalleventa.component.css']
})
export class DialogdetalleventaComponent {
  detalleSource: DTODetallePedido[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;

  constructor(
    public dialogRef: MatDialogRef<DialogdetalleventaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedServ: SharedService,) {

    // data.producto
    this.sharedServ.traerDetalleVentaAlertasPedidosFiltradas(this.data.idVenta).subscribe({
      next: (detallePedido) => {
        this.detalleSource = detallePedido;
      },
      error: (error) => {
      }
    })

  }



}
