import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-generico',
  templateUrl: './add-edit-generico.component.html',
  styleUrls: ['./add-edit-generico.component.css']
})
export class AddEditGenericoComponent {
  textoMostrar: string;
  tipo: string;
  objetoGenerico: any;
  valorInput: string;
  constructor(public dialogRef: MatDialogRef<AddEditGenericoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.objetoGenerico = data.objetoGenerico;
    this.tipo = data.tipo;
    this.textoMostrar = data.textoMostrar;

    if (data.objetoGenerico != null) {
      //Si el objeto es distinto de null, significa que estoy en EDITAR.
      this.valorInput = data.nombre;
      this.textoMostrar = "Modificar " + this.tipo;
    } else {
      this.valorInput = "";
      this.textoMostrar = "Alta " + this.tipo;
    }
  }
  cancel() {
    this.dialogRef.close();
  }
  accept() {
    console.log('Accept clicked');
  }
}
