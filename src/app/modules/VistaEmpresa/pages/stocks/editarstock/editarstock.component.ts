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
  }
  actualizarStock() {
    if (this.contieneSimboloNegativo(this.data.stockCompleto) == false) {
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
    } else {

      this.funcionesGlobalesService.abrirSnack("Las cantidades tienen que ser numero y mayores a 0", 2000, false);
    }


  }

  validarCantidad(color: any) {
    // Convertir a cadena para revisar los caracteres y luego a número para la validación
    let valor = String(color.cantidad);

    // Eliminar cualquier símbolo de '+' o '-'
    valor = valor.replace(/[+-]/g, "");

    // Convertir de nuevo a número para realizar la validación numérica
    const numero = Number(valor);

    // Asegurar que el valor sea un número positivo mayor o igual a 1
    if (numero < 1) {
      color.cantidad = 1;
    } else {
      color.cantidad = numero;
    }
  }

  private contieneSimboloNegativo(dtoStock: DTOStockEnvio): boolean {
    console.log(dtoStock);
    let contiene = false;
    dtoStock.talles.forEach(talleActual => {
      const valorComoCadena = talleActual.cantidad.toString();
      if (valorComoCadena.includes('-')) {
        contiene = true;
      }
    });
    return contiene;
  }
}
