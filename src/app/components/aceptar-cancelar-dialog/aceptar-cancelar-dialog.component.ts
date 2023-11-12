import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aceptar-cancelar-dialog',
  templateUrl: './aceptar-cancelar-dialog.component.html',
  styleUrls: ['./aceptar-cancelar-dialog.component.css']
})
export class AceptarCancelarDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
