import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { timeout } from 'rxjs';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { DTOTipoPrenda } from 'src/app/interfaces/tipoProducto.interface';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-add-edit-generico',
  templateUrl: './add-edit-generico.component.html',
  styleUrls: ['./add-edit-generico.component.css']
})
export class AddEditGenericoComponent {
  textoMostrar: string;
  editar: boolean;
  origen: string;
  valorInput: string;
  resultadoAccion: string = "";
  campoVacio: string = "";
  nombreExiste: string = "";
  constructor(public dialogRef: MatDialogRef<AddEditGenericoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedServ: SharedService) {
    //origen
    //editar
    //textoMostrar
    //textoDelObjeto
    this.editar = data.editar;
    this.origen = data.origen;
    if (this.editar == true) {
      //Si el objeto es distinto de null, significa que estoy en EDITAR.
      this.valorInput = data.objeto.nombre;
      this.textoMostrar = data.textoMostrar;
    } else {
      this.valorInput = "";
      this.textoMostrar = data.textoMostrar;
    }
  }
  realizarAccion() {
    if (this.editar == false) {
      this.darDeAlta();
    } else {
      this.editarObj();
    }
  }
  private darDeAlta() {

    if (this.valorInput != "") {
      const nuevo: DTOGenAbms = {
        id: 0,
        nombre: this.valorInput,
        bajaLogica: false
      };
      switch (this.origen) {
        case 'tipoprenda':

          this.sharedServ.altaTipoPrenda(nuevo)
            .subscribe({
              next: (resultadoAlta) => {
                // Si la llamada es exitosa, cerrar el diálogo con el resultado
                if (resultadoAlta) {
                  this.dialogRef.close({ result: resultadoAlta, error: "" });
                } else {
                  this.dialogRef.close({ result: resultadoAlta, error: "No se pudo realizar el alta" });
                }
              },
              error: (error) => {
                // En caso de error, cerrar el diálogo con el error
                this.dialogRef.close({ result: false, error: "Error al editar." });
              }
            });
          break;
        case 'colores':
          this.sharedServ.altaColor(nuevo)
            .subscribe({
              next: (resultadoAlta) => {
                // Si la llamada es exitosa, cerrar el diálogo con el resultado
                if (resultadoAlta) {
                  this.dialogRef.close({ result: resultadoAlta, error: "" });
                } else {
                  this.dialogRef.close({ result: resultadoAlta, error: "No se pudo realizar el alta" });
                }
              },
              error: (error) => {
                // En caso de error, cerrar el diálogo con el error
                this.dialogRef.close({ result: false, error: "Error al editar." });
              }
            });
          break;
        case 'talles':
          this.sharedServ.altaTalle(nuevo)
            .subscribe({
              next: (resultadoAlta) => {
                // Si la llamada es exitosa, cerrar el diálogo con el resultado
                if (resultadoAlta) {
                  this.dialogRef.close({ result: resultadoAlta, error: "" });
                } else {
                  this.dialogRef.close({ result: resultadoAlta, error: "No se pudo realizar el alta" });
                }
              },
              error: (error) => {
                // En caso de error, cerrar el diálogo con el error
                this.dialogRef.close({ result: false, error: "Error al editar." });
              }
            });
          break;
      }
    } else {
      this.campoVacio = "El campo no puede estar vacío."
    }
  }


  private editarObj() {
    if (this.valorInput != "") {
      const objEditar: DTOGenAbms = {
        id: this.data.objeto.id,
        nombre: this.valorInput,
        bajaLogica: false
      };
      switch (this.origen) {
        case 'tipoprenda':
          this.sharedServ.editarTipoPrenda(objEditar)
            .subscribe({
              next: (resultadoAlta) => {
                // Si la llamada es exitosa, cerrar el diálogo con el resultado
                this.dialogRef.close({ result: resultadoAlta, error: "" });
              },
              error: (error) => {
                // En caso de error, cerrar el diálogo con el error
                this.dialogRef.close({ result: false, error: "Error al editar" });
              }
            });
          break;
        case 'colores':
          this.sharedServ.editarColor(objEditar)
            .subscribe({
              next: (resultadoAlta) => {
                // Si la llamada es exitosa, cerrar el diálogo con el resultado
                this.dialogRef.close({ result: resultadoAlta, error: "" });
              },
              error: (error) => {
                // En caso de error, cerrar el diálogo con el error
                this.dialogRef.close({ result: false, error: "Error al editar" });
              }
            });
          break;
        case 'talles':
          this.sharedServ.editarTalle(objEditar)
            .subscribe({
              next: (resultadoAlta) => {
                // Si la llamada es exitosa, cerrar el diálogo con el resultado
                this.dialogRef.close({ result: resultadoAlta, error: "" });
              },
              error: (error) => {
                // En caso de error, cerrar el diálogo con el error
                this.dialogRef.close({ result: false, error: "Error al editar" });
              }
            });
          break;
      }
    } else {
      this.campoVacio = "El campo no puede estar vacío."
    }
  }
  cancel() {
    this.dialogRef.close();
  }


}
