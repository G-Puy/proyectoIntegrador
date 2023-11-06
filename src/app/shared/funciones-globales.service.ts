import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar-component/snackbar-component.component';
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



}
