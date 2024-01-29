import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DTOAlertaStock } from 'src/app/interfaces/Alertas/Stock/DTOAlertaStock.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-bandejastock',
  templateUrl: './bandejastock.component.html',
  styleUrls: ['./bandejastock.component.css']
})
export class BandejastockComponent {
  alertas: DTOAlertaStock[] = [];
  constructor(private sharedServ: SharedService, private funcionesGlobalesService: FuncionesGlobalesService) {
    this.cargarAlertas();
  }
  private cargarAlertas() {
    this.alertas = [];
    this.sharedServ.traerAlertasStock().subscribe({
      next: (dataAlertasStock) => {
        if (dataAlertasStock.length > 0) {
          this.alertas = dataAlertasStock;
        }
      },
      error: (error) => {
      }
    })
  }
  leerAlerta(alerta: DTOAlertaStock) {
    this.sharedServ.leerAlertaStock(alerta.id).subscribe({
      next: (dataAlertasStock) => {

        if (dataAlertasStock) {
          this.funcionesGlobalesService.abrirSnack("Alerta leida.", 2000, true);
          this.cargarAlertas();
        } else {
          this.funcionesGlobalesService.abrirSnack("La alerta no pudo ser leida correctamente.", 2000, false);
        }
      },
      error: (error) => {
        this.funcionesGlobalesService.abrirSnack(error, 2000, false);

      }
    })
  }
}
