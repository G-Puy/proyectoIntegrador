import { Component, OnInit } from '@angular/core';
import { DTOAlertaPedido } from 'src/app/interfaces/Alertas/Ventas/DTOAlertaPedido.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';
import { DialogdetalleventaComponent } from './dialogdetalleventa/dialogdetalleventa.component';
import { MatDialog } from '@angular/material/dialog';
import { DTOFiltroAlertasPedidos } from 'src/app/interfaces/Alertas/Ventas/DTOFiltroAlertasPedidos.interface';

@Component({
  selector: 'app-bandejaventas',
  templateUrl: './bandejaventas.component.html',
  styleUrls: ['./bandejaventas.component.css']
})
export class BandejaventasComponent implements OnInit {
  filtroAlertas: DTOFiltroAlertasPedidos = {
    idVenta: -1,
    realizado: '',
    envioRetiro: '',
    nombre: '',
    apellido: ''
  };
  codigoVenta: number | null = null;

  panelOpenState = true;
  alertas: DTOAlertaPedido[] = [];
  constructor(private sharedServ: SharedService, private funcionesGlobalesService: FuncionesGlobalesService, public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.cargarAlertasSinRealizar();
  }

  cargarAlertas() {
    this.alertas = [];
    if (this.codigoVenta == null) this.filtroAlertas.idVenta = -1;
    else this.filtroAlertas.idVenta = this.codigoVenta;
    this.sharedServ.traerAlertasPedidosFiltradas(this.filtroAlertas).subscribe({
      next: (dataAlertasStock) => {
        if (dataAlertasStock.length > 0) {
          this.alertas = dataAlertasStock;
        }
      },
      error: (error) => {
      }
    })
  }

  private cargarAlertasSinRealizar() {
    this.alertas = [];
    if (this.codigoVenta == null) this.filtroAlertas.idVenta = -1;
    else this.filtroAlertas.idVenta = this.codigoVenta;
    this.filtroAlertas.realizado = 'noRealizado';
    this.sharedServ.traerAlertasPedidosFiltradas(this.filtroAlertas).subscribe({
      next: (dataAlertasStock) => {
        if (dataAlertasStock.length > 0) {
          this.alertas = dataAlertasStock;
        }
      },
      error: (error) => {
      }
    })

  }
  abrirDialogEditar(idVenta: number) {
    /*  const dialogRef = this.dialog.open(DialogdetalleventaComponent, {
       width: '90vh',
       data: {
         idVenta: idVenta
       }
     }); */
  }
  vaciarCampo(cualVacio: string) {

    switch (cualVacio) {
      case 'idVenta':
        this.codigoVenta = null;
        break;
      case 'nombreCliente':
        this.filtroAlertas.nombre = '';
        break;
      case 'apellidoCliente':
        this.filtroAlertas.apellido = '';
        break;
    }
  }
  vaciarFiltros() {
    this.codigoVenta = null;
    this.filtroAlertas = {
      idVenta: -1,
      realizado: '',
      envioRetiro: '',
      nombre: '',
      apellido: ''
    };

  }
  realizarPedido(idVenta: number) {
    /*  this.sharedServ.confirmarAlertasPedidosFiltradas(idVenta).subscribe({
       next: (response) => {
 
         if (response) {
           this.funcionesGlobalesService.abrirSnack("El pedido fue realizado correctamente.", 2000, true);
           this.cargarAlertas();
         } else {
           this.funcionesGlobalesService.abrirSnack("Error al realizar pedido", 2000, false);
         }
       },
       error: (error) => {
         this.funcionesGlobalesService.abrirSnack("Error al realizar el pedido", 2000, false);
 
       }
     }) */
  }
}
