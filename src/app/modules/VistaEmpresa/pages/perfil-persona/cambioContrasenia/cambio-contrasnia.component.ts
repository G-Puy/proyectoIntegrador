import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { timestamp } from 'rxjs';
import { AddEditGenericoComponent } from 'src/app/components/add-edit-generico/add-edit-generico.component';
import { DTOCambioPass } from 'src/app/interfaces/DTOCambioPass.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-cambio-contrasnia',
  templateUrl: './cambio-contrasnia.component.html',
  styleUrls: ['./cambio-contrasnia.component.css']
})
export class CambioContrasniaComponent {
  passActual: string = "";
  passNueva1: string = "";
  passNueva2: string = "";
  validacionCompletos: boolean = false;
  validacionPassIguales: boolean = false;
  objCambiarPass: DTOCambioPass = {
    id: 0,
    nombreDeUsuario: '',
    contrasenia: '',
    contraseniaNueva: ''
  }

  errorValidacionPassass: string = "";

  constructor(private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService,
    public dialogRef: MatDialogRef<CambioContrasniaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  controles() {
    if (this.passActual == '' || this.passNueva1 == '' || this.passNueva2 == '') {
      this.validacionPassIguales = false;
      this.errorValidacionPassass = "Todos los campos son obligatorios";
      setTimeout(() => {
        this.errorValidacionPassass = "";
      }, 3000);
      return false;
    } else {
      this.validacionPassIguales = true;
    }
    if (this.passNueva1 != this.passNueva2) {
      this.validacionCompletos = false;
      this.errorValidacionPassass = "Las contraseñas no coinciden";
      setTimeout(() => {
        this.errorValidacionPassass = "";
      }, 3000);
      return false;
    } else {
      this.validacionCompletos = true;
    }
    return true;
  }

  private analizarRequisitosPass() {


    /*  this.errorValidacionPassass = "La contraseña nueva no cumple los requisitos";
     setTimeout(() => {
       this.errorValidacionPassass = "";
     }, 3000); */


    return true;
  }

  aceptar() {
    if (this.controles() == false) {
      return;
    } else if (this.analizarRequisitosPass() == false) {
      return;
    } else {
      this.objCambiarPass.id = this.data.personaData.idUsuario;
      this.objCambiarPass.contrasenia = this.passActual;
      this.objCambiarPass.contraseniaNueva = this.passNueva1;
      this.objCambiarPass.nombreDeUsuario = this.data.personaData.nombreDeUsuario;
      this.sharedServ.modificarMiPass(this.objCambiarPass)
        .subscribe({
          next: (resultadoEliminar) => {
            if (resultadoEliminar) {
              this.funcionesGlobalesService.abrirSnack("El cambio fue exitoso.", 3000, true);
              this.dialogRef.close();
            }
            else {
              this.funcionesGlobalesService.abrirSnack("No se pudo realizar el cambio", 3000, true);
            }
          },
          error: (error) => {
            this.funcionesGlobalesService.abrirSnack(error.error, 3000, false);
          }
        });
    }
  }
}
