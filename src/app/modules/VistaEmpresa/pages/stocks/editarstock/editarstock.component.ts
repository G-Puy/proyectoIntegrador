import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-editarstock',
  templateUrl: './editarstock.component.html',
  styleUrls: ['./editarstock.component.css']
})
export class EditarstockComponent {


  constructor(
    private sharedServ: SharedService,
    public dialogRef: MatDialogRef<EditarstockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private funcionesGlobalesService: FuncionesGlobalesService
  ) {

    console.log(this.data);



  }
}
