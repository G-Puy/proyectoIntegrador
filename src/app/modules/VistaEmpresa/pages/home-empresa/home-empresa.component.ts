import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilPersonaComponent } from '../perfil-persona/perfil-persona.component';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-home-empresa',
  templateUrl: './home-empresa.component.html',
  styleUrls: ['./home-empresa.component.css']
})
export class HomeEmpresaComponent {


  cantAlertaPedidos: number = 0;
  cantAlertaStock: number = 0;
  constructor(private sharedServ: SharedService) {
    this.traerCantidadAlrtStock();
    this.traerCantidadAlrtPedidos();
  }

  traerCantidadAlrtPedidos() {
    this.sharedServ.traerCantidadPedidosPendientes().subscribe({
      next: (response) => {
        console.log("Cant alertas pedidos");
        console.log(response);
        this.cantAlertaPedidos = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  traerCantidadAlrtStock() {
    this.sharedServ.traerCantidadAlertasStock().subscribe({
      next: (response) => {
        console.log("Cant alertas stock");
        console.log(response);
        this.cantAlertaStock = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
