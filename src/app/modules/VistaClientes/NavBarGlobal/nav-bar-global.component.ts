import { Component } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MenuComponent } from '../Menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/shared.service';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { DialogUnProductoComponent } from '../pages/DialogUnProducto/DialogUnProducto.component';
import { DialogbuscadorComponent } from '../pages/dialogbuscador/dialogbuscador.component';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar-global',
  templateUrl: './nav-bar-global.component.html',
  styleUrls: ['./nav-bar-global.component.css']
})
export class NavBarGlobalComponent {
  private subscription: Subscription
  constructor(
    private overlay: Overlay,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService,
    private router: Router,
    private location: Location
  ) {
    this.subscription = new Subscription();
  }
  icono: string = "menu";
  mostrarRuta: string = "/store";
  ngOnInit() {
    this.subscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.mostrarRuta = event.url;
      if (this.mostrarRuta == "/productos") this.icono = "account_circle";
      else this.icono = "arrow_back_ios";
      if (this.mostrarRuta == "/store") {
        this.icono = "menu";

      }
      console.log(this.mostrarRuta);
    });
  }
  ngOnDestroy(): void {
    // Asegúrate de desuscribirte para evitar fugas de memoria
    this.subscription.unsubscribe();
  }
  accion() {


    switch (this.mostrarRuta) {
      case "/store/productos":
        this.location.back();
        // this.router.navigate(['/lEmpresa']); //Aca tiene que ser al perfil personal.
        break;
      case "/store":
        this.openOberlay();
        break;
    }




    //overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

  private openOberlay() {
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

  }



  openBuscadorProductos() {
    const dialogRef = this.dialog.open(DialogbuscadorComponent, {
      width: this.funcionesGlobalesService.tamMaxDialogMobile(),
      disableClose: false  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });
  }





}
