import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DTOStockEnvio } from 'src/app/interfaces/DTOsEnvio/stockEnvioDTO.interface';
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
  actualizarStock() {
    // editarStock
    this.sharedServ.editarStock(this.data.stockCompleto).subscribe({
      next: (resultadoModificar) => {
        //resultado lindo
        if (resultadoModificar) {
          this.dialogRef.close({ result: resultadoModificar, error: "" });
        } else {
          this.dialogRef.close({ result: resultadoModificar, error: "No se pudo modificar el stock" });
        }
      }, error: (errorModificar) => {
      }
    })
  }



}
