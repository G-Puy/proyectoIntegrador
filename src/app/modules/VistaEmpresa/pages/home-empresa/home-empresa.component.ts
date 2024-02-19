import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilPersonaComponent } from '../perfil-persona/perfil-persona.component';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-empresa',
  templateUrl: './home-empresa.component.html',
  styleUrls: ['./home-empresa.component.css']
})
export class HomeEmpresaComponent {

  tipoUsuario: string = '0';
  cantAlertaPedidos: number = 0;
  cantAlertaStock: number = 0;
  constructor(private sharedServ: SharedService, private router: Router) {
    this.traerCantidadAlrtStock();
    this.traerCantidadAlrtPedidos();
    this.tipoUsuario = localStorage.getItem('tipoUsuario')!;
  }

  traerCantidadAlrtPedidos() {
    this.sharedServ.traerCantidadPedidosPendientes().subscribe({
      next: (response) => {
        this.cantAlertaPedidos = response;
      },
      error: (error) => {
      }
    })
  }
  traerCantidadAlrtStock() {
    this.sharedServ.traerCantidadAlertasStock().subscribe({
      next: (response) => {
        this.cantAlertaStock = response;
      },
      error: (error) => {
      }
    })
  }
  navegarAStore() {
    this.router.navigate(['store']);
  }

}
