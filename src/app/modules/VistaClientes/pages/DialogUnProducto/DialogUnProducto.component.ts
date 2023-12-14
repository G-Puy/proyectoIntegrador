import { Overlay } from '@angular/cdk/overlay';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dialogmenu',
  templateUrl: './DialogUnProducto.component.html',
  styleUrls: ['./DialogUnProducto.component.css']
})
export class DialogUnProductoComponent {
  objetoProducto: recibirProductoDTOBack | undefined;

  seleccionTalle: DTOGenAbms | undefined;
  seleccionColor: DTOGenAbms | undefined;
  cargaTalles: DTOGenAbms[] = [];
  cargaColores: DTOGenAbms[] = [];

  constructor(
    private sharedServ: SharedService,
    public dialogRef: MatDialogRef<DialogUnProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private funcionesGlobalesService: FuncionesGlobalesService) {
    this.sharedServ.getAllTalles().subscribe(talles => {
      this.cargaTalles = talles;
    });
    this.sharedServ.getAllColores().subscribe(colores => {
      this.cargaColores = colores;
    });
    this.objetoProducto = data.producto;
    console.log(this.objetoProducto);
  }
  public darSrcProducto(): string {
    return `data:image/${this.objetoProducto!.imagenes[0].extension};base64,${this.objetoProducto!.imagenes[0].imagen}`;
  }

}
