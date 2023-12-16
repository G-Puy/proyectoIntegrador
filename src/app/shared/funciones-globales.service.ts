import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar-component/snackbar-component.component';
import { recibirProductoDTOBack } from '../interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
@Injectable({
  providedIn: 'root'
})
export class FuncionesGlobalesService {

  constructor(private snackBar: MatSnackBar) { }

  abrirSnack(message: string, duration: number, exitoOno: boolean) {
    let snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, duration: duration, exitoOno: exitoOno },
      duration: duration !== 0 ? duration : undefined, // Pasar undefined si la duración es 0
      verticalPosition: 'top',
      horizontalPosition: 'center', // Puedes elegir 'start', 'center', 'end', 'left', o 'right'

    });

    // Si la duración es 0, no cerrar automáticamente el Snackbar
    if (duration === 0) {
      snackBarRef.dismissWithAction(); // Previene el cierre automático en caso de acciones del usuario
    }
  }

  //*ESTE METODO RETORNA EL TAMA:O MAXIMO PAR ALOS DIALOGOS DE MOBILE
  tamMaxDialogMobile(): string {
    return "500px";
  }

  public cargarSrc(producto: recibirProductoDTOBack): string {
    return `data:image/${producto.imagenes[0].extension};base64,${producto.imagenes[0].imagen}`;

  }

}
