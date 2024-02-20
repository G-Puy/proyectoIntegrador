import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';
import { CambioContrasniaComponent } from './cambioContrasenia/cambio-contrasnia.component';
import { DTOUsuario } from 'src/app/interfaces/usuario.interfce';

@Component({
  selector: 'app-perfil-persona',
  templateUrl: './perfil-persona.component.html',
  styleUrls: ['./perfil-persona.component.css']
})
export class PerfilPersonaComponent {
  username: string = "";
  idPersona: number = 0;
  errorValidacionPassass: string = "";
  persona: DTOUsuario = {
    idUsuario: 0,
    nombreDeUsuario: '',
    contrasenia: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    bajaLogica: false,
    tipoUsuario: 0
  };
  constructor(private sharedServ: SharedService,
    public dialog: MatDialog) {
    this.username = this.sharedServ.obtenerUsernameLogeado();
    this.traerDatosPersona();
  }

  openDialogEditarPass() {
    const dialogRef = this.dialog.open(CambioContrasniaComponent, {
      width: '300px',
      height: '450px',
      data: { personaData: this.persona },
      disableClose: true
    });
  }


  private traerDatosPersona() {

    const idPersonaNumerica = Number(localStorage.getItem('idUsuario'));
    this.sharedServ.cargarColaboradorPorId(idPersonaNumerica)
      .subscribe({
        next: (usu) => {
          this.persona = usu;
        },
        error: (error) => {
        }
      });




  }


}
