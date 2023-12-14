import { Component } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MenuComponent } from '../Menu/menu.component';
import { DialogmenuComponent } from '../pages/dialogmenu/dialogmenu.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/shared.service';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';


@Component({
  selector: 'app-nav-bar-global',
  templateUrl: './nav-bar-global.component.html',
  styleUrls: ['./nav-bar-global.component.css']
})
export class NavBarGlobalComponent {

  constructor(
    private overlay: Overlay,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService
  ) { }



  abrirMenu() {

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'colorclass',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
      //.centerVertically(),
    });

    const overlayRef = this.overlay.create(overlayConfig);
    const portal = new ComponentPortal(MenuComponent);
    const componentRef = overlayRef.attach(portal);
    componentRef.instance.cerrarOverlay.subscribe(() => {
      overlayRef.detach();
    });


    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }


  //#region DIALOGS


  openDialogMenu() {
    const dialogRef = this.dialog.open(DialogmenuComponent, {
      width: '500px',
      disableClose: false  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });
  }



  //#endregion DIALOGS







}
