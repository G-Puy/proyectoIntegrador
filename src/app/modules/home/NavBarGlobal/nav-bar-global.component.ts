import { Component } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MenuComponent } from '../Menu/menu.component';


@Component({
  selector: 'app-nav-bar-global',
  templateUrl: './nav-bar-global.component.html',
  styleUrls: ['./nav-bar-global.component.css']
})
export class NavBarGlobalComponent {

  constructor(
    private overlay: Overlay,
  ) { }



  abrirMenu() {

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'colorclass',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    const overlayRef = this.overlay.create(overlayConfig);
    const portal = new ComponentPortal(MenuComponent);
    const componentRef = overlayRef.attach(portal);
    componentRef.instance.cerrarOverlay.subscribe(() => {
      overlayRef.detach();
    });
    /* componentRef.instance.cerrarOverlay = () => {
      overlayRef.detach();
    }; */

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }


}
