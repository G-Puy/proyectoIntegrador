import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { timeout } from 'rxjs';
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
      this.valorInput = data.textoDelObjeto;
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
      switch (this.origen) {
        case 'tipoprenda':
          const nuevoTipoPrenda: DTOTipoPrenda = {
            IdTipoPrenda: 0,
            NombreTipoPrenda: this.valorInput,
            BajaLogica: false
          };
          this.sharedServ.altaTipoPrenda(nuevoTipoPrenda)
            .subscribe({
              next: (resultadoAlta) => {
                // Si la llamada es exitosa, cerrar el diálogo con el resultado
                this.dialogRef.close(resultadoAlta);
              },
              error: (error) => {
                // En caso de error, cerrar el diálogo con el error
                console.error('Error al dar de alta:', error);
                this.dialogRef.close({ result: 'ALTA ERROR', error: error });
              }
            });
          break;
      }
    } else {
      this.campoVacio = "El campo no puede estar vacio."
    }
  }


  private editarObj() {
    switch (this.origen) {
      case 'tipoprenda':
        console.log('EDITAR tipoprenda');
        //llamar servicio para dar de editar
        break;
    }
  }
  cancel() {
    this.dialogRef.close();
  }


}
