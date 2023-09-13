import { Component, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MenuComponent } from '../Menu/menu.component';

@Component({
  selector: 'app-nav-bar-global',
  templateUrl: './nav-bar-global.component.html',
  styleUrls: ['./nav-bar-global.component.css']
})
export class NavBarGlobalComponent {
  constructor(public dialog: MatDialog, private ngZone: NgZone) { }

  abrirMenu() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%'; // Establecer el ancho al 100%
    dialogConfig.height = '100%'; // Establecer el alto al 100%
    dialogConfig.panelClass = 'custom-dialog'; // Aplicar la clase de estilo personalizada
    const dialogRef = this.dialog.open(MenuComponent, dialogConfig);
  }
  estadoDialogo: boolean = false;
  openDialogoClose() {

    if (this.estadoDialogo == true) {

      this.ngZone.run(() => {
        this.estadoDialogo = false;
      });

    } else {
      this.ngZone.run(() => {
        this.estadoDialogo = true;
      });

    }
  }


}
