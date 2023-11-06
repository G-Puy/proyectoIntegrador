import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-component',
  templateUrl: './snackbar-component.component.html',
  styleUrls: ['./snackbar-component.component.css']
})
export class SnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, duration: number, exitoOno: boolean }
  ) { }

  closeSnackbar() {
    this.snackBarRef.dismiss();
  }
}
