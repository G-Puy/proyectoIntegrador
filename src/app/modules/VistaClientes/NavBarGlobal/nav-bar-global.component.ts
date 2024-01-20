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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DialogCarritoComponent } from '../pages/carrito/dialog-carrito/dialog-carrito.component';

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
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription = new Subscription();
  }
  mostrarCarrito: boolean = true;
  mostrarBuscador: boolean = true;
  mostrarIcono: boolean = true;
  icono: string = "menu";
  mostrarRuta: string = "/store";
  ngOnInit() {
    this.analizarRutas(this.router.url);
    this.subscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.mostrarRuta = event.url;
      this.analizarRutas(this.mostrarRuta);
    });
  }

  private analizarRutas(rutaActual: string) {
    //if (rutaActual == "/productos") this.icono = "account_circle";
    if (rutaActual != "/store/productos") {
      this.icono = "arrow_back_ios";
      this.mostrarCarrito = true;
      this.mostrarBuscador = true;
      this.mostrarIcono = true;

    }
    if (rutaActual == "/store") {
      this.icono = "menu";
      this.mostrarCarrito = true;
      this.mostrarBuscador = true;
      this.mostrarIcono = true;

    }
    if (rutaActual == "/store/failure" || rutaActual == "/store/pending" || rutaActual == "/store/success" || rutaActual == "/store/pagos" || this.mostrarRuta == "/productos") {
      this.mostrarCarrito = false;
      this.mostrarBuscador = false;
      this.mostrarIcono = false;
    }
    if (rutaActual == "/store/productos") {
      this.icono = "arrow_back_ios";

      this.mostrarCarrito = true;
      this.mostrarBuscador = true;
      this.mostrarIcono = true;

    }
  }
  ngOnDestroy(): void {
    // Asegúrate de desuscribirte para evitar fugas de memoria
    this.subscription.unsubscribe();
  }
  accion() {
    this.mostrarRuta = this.router.url;

    switch (this.mostrarRuta) {
      case "/store/productos":
        this.location.back();
        break;
      case "/store/pagos":
        this.location.back();
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
  openCarrito() {
    const dialogRef = this.dialog.open(DialogCarritoComponent, {
      width: this.funcionesGlobalesService.tamMaxDialogMobile(),
      disableClose: false  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });
  }
}
